import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { I18n } from '../i18n/i18n';
import { LegalCopy } from '../i18n/legal-copy';

export type LegalDocument = 'TERMS' | 'PRIVACY' | 'REFUND' | 'FINANCIAL_DATA';

// What the backend stores per ticked box: which document, which version, and a fingerprint of the exact text shown.
export interface DocumentAcceptance {
  document: LegalDocument;
  version: string;
  sha256: string;
  accepted: true;
}

const KEYS: Record<LegalDocument, keyof Pick<LegalCopy, 'terms' | 'privacy' | 'refund' | 'financialData'>> = {
  TERMS: 'terms',
  PRIVACY: 'privacy',
  REFUND: 'refund',
  FINANCIAL_DATA: 'financialData',
};

const STORAGE_KEY = 'consent';

interface StoredConsent {
  anonymousId: string;
  terms: string;
  privacy: string;
}

@Injectable({
  providedIn: 'root',
})
export class Consent {
  private readonly http = inject(HttpClient);
  private readonly i18n = inject(I18n);

  // The WhatsApp link waiting for the visitor to accept (null = dialog closed).
  readonly pendingWhatsappUrl = signal<string | null>(null);

  // SHA-256 of the document exactly as shown in the current language. Same text → same hash, so it can be re-checked later.
  async accept(document: LegalDocument): Promise<DocumentAcceptance> {
    const doc = this.i18n.t().legal[KEYS[document]];
    const text = JSON.stringify({ title: doc.title, intro: doc.intro, sections: doc.sections });
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    const sha256 = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
    return { document, version: doc.version, sha256, accepted: true };
  }

  // Already accepted the current Terms + Privacy versions in this browser?
  hasWhatsappConsent(): boolean {
    const stored = this.read();
    const legal = this.i18n.t().legal;
    return !!stored && stored.terms === legal.terms.version && stored.privacy === legal.privacy.version;
  }

  // Called from the dialog's "Continue" click. Opens WhatsApp first (browsers only allow pop-ups straight from a click),
  // then records the consent in the background; keepalive lets the request finish even if the tab changes.
  // The browser only remembers "accepted" once the server has stored it, so a failed save asks again next time.
  confirmWhatsapp(documents: DocumentAcceptance[]) {
    const url = this.pendingWhatsappUrl();
    if (!url) return;
    window.open(url, '_blank', 'noopener');
    this.pendingWhatsappUrl.set(null);

    const anonymousId = this.read()?.anonymousId ?? crypto.randomUUID();
    const legal = this.i18n.t().legal;
    const accepted: StoredConsent = { anonymousId, terms: legal.terms.version, privacy: legal.privacy.version };
    fetch(`${environment.apiUrl}/public/consents`, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anonymousId, language: this.i18n.lang(), documents }),
    })
      .then(res => {
        if (res.ok) this.write(accepted);
      })
      .catch(() => {
        // Not blocking the visitor: they still reach WhatsApp. The agency confirms acceptance again when hiring.
      });
  }

  getAcceptance(token: string) {
    return this.http.get<{ serviceType: string | null; expiresAt: string }>(`${environment.apiUrl}/public/acceptance/${encodeURIComponent(token)}`);
  }

  submitAcceptance(token: string, fullName: string, documents: DocumentAcceptance[]) {
    return this.http.post<{ acceptedAt: string }>(`${environment.apiUrl}/public/acceptance/${encodeURIComponent(token)}`, {
      fullName,
      language: this.i18n.lang(),
      documents,
    });
  }

  private read(): StoredConsent | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as StoredConsent) : null;
    } catch {
      return null;
    }
  }

  private write(value: StoredConsent) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {}
  }
}
