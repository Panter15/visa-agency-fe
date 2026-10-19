import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Consent, LegalDocument } from '../../shared/consent/consent';
import { Header } from '../../shared/header/header';
import { I18n } from '../../shared/i18n/i18n';
import { Footer } from '../footer/footer';

type State = 'loading' | 'invalid' | 'ready' | 'sending' | 'error' | 'done';

// /aceptar/:token — the private link the agency sends when a client hires them.
// Separate checkboxes for Terms, Privacy, Refund policy and the express consent for financial data;
// the backend stores each one with the client's name, date, IP, browser and the exact document version.
@Component({
  selector: 'app-acceptance',
  imports: [Header, Footer, RouterLink],
  templateUrl: './acceptance.html',
  styleUrl: './acceptance.sass',
})
export class Acceptance {
  private readonly consent = inject(Consent);
  private readonly token: string = inject(ActivatedRoute).snapshot.params['token'];
  protected readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;

  protected readonly state = signal<State>('loading');
  protected readonly serviceType = signal<string | null>(null);
  protected readonly acceptedAt = signal<string | null>(null);
  protected readonly acceptedAtText = computed(() => {
    const at = this.acceptedAt();
    return at ? new Intl.DateTimeFormat(this.i18n.lang(), { dateStyle: 'long', timeStyle: 'long' }).format(new Date(at)) : '';
  });

  protected readonly fullName = signal('');
  protected readonly checked = signal<Record<LegalDocument, boolean>>({ TERMS: false, PRIVACY: false, REFUND: false, FINANCIAL_DATA: false });
  protected readonly canSubmit = computed(
    () => this.fullName().trim().length >= 3 && Object.values(this.checked()).every(Boolean) && this.state() !== 'sending',
  );

  constructor() {
    this.consent.getAcceptance(this.token).subscribe({
      next: info => {
        this.serviceType.set(info.serviceType);
        this.state.set('ready');
      },
      error: () => this.state.set('invalid'),
    });
  }

  protected toggle(document: LegalDocument, value: boolean) {
    this.checked.update(c => ({ ...c, [document]: value }));
  }

  protected async submit() {
    if (!this.canSubmit()) return;
    this.state.set('sending');
    const documents = await Promise.all(
      (['TERMS', 'PRIVACY', 'REFUND', 'FINANCIAL_DATA'] as const).map(d => this.consent.accept(d)),
    );
    this.consent.submitAcceptance(this.token, this.fullName().trim(), documents).subscribe({
      next: res => {
        this.acceptedAt.set(res.acceptedAt);
        this.state.set('done');
      },
      error: err => this.state.set(err.status === 404 ? 'invalid' : 'error'),
    });
  }

  protected print() {
    window.print();
  }
}
