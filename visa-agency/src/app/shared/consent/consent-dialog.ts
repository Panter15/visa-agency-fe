import { Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n';
import { Consent, DocumentAcceptance } from './consent';

// The dialog the WhatsApp gate opens. One instance lives in app.html.
// Native <dialog> + showModal(): focus is trapped inside and Esc closes it, for keyboard and screen-reader users.
@Component({
  selector: 'app-consent-dialog',
  imports: [RouterLink],
  template: `
    <dialog #dialog class="consent" aria-labelledby="consent-title" (close)="cancel()">
      <h2 id="consent-title">{{ t().consentGate.title }}</h2>
      <p class="text">{{ t().consentGate.text }}</p>

      <label class="check">
        <input type="checkbox" [checked]="terms()" (change)="terms.set($any($event.target).checked)" />
        <span>
          {{ t().consentGate.terms }}
          <a routerLink="/terminos" target="_blank">{{ t().consentGate.termsLink }}<span class="sr-only"> {{ t().consentGate.opensNewTab }}</span></a>
        </span>
      </label>

      <label class="check">
        <input type="checkbox" [checked]="privacy()" (change)="privacy.set($any($event.target).checked)" />
        <span>
          {{ t().consentGate.privacy }}
          <a routerLink="/privacidad" target="_blank">{{ t().consentGate.privacyLink }}<span class="sr-only"> {{ t().consentGate.opensNewTab }}</span></a>
          {{ t().consentGate.privacyEnd }}
        </span>
      </label>

      <div class="actions">
        <button type="button" class="link-button" (click)="dialog.close()">{{ t().consentGate.cancel }}</button>
        <button type="button" class="btn" [disabled]="!(terms() && privacy() && documents())" (click)="continue()">
          {{ t().consentGate.continue }} <span class="btn-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </dialog>
  `,
  styles: `
    .consent
      width: min(520px, calc(100vw - 32px))
      padding: 32px
      border: none
      border-radius: 16px
      background: var(--paper)
      color: var(--ink)
      box-shadow: 0 30px 80px rgba(20, 40, 74, 0.25)

      &::backdrop
        background: rgba(20, 40, 74, 0.55)

    h2
      font-size: 1.8rem

    .text
      margin: 12px 0 24px
      color: var(--ink-soft)

    .check
      display: flex
      gap: 12px
      align-items: flex-start
      margin-bottom: 16px
      cursor: pointer

      input
        flex: 0 0 auto
        width: 20px
        height: 20px
        margin-top: 3px
        accent-color: var(--ink)

      a
        color: var(--accent-text)
        text-underline-offset: 3px

    .actions
      display: flex
      flex-wrap: wrap
      justify-content: flex-end
      align-items: center
      gap: 16px
      margin-top: 28px

    .link-button
      border: none
      background: none
      color: var(--ink-soft)
      font: inherit
      text-decoration: underline
      cursor: pointer

    .btn[disabled]
      opacity: 0.45
      cursor: not-allowed
  `,
})
export class ConsentDialog {
  private readonly consent = inject(Consent);
  protected readonly t = inject(I18n).t;
  protected readonly terms = signal(false);
  protected readonly privacy = signal(false);
  // Fingerprints are computed when the dialog opens, so the "Continue" click can open WhatsApp synchronously
  // (Safari on iPhone blocks new tabs opened after an await).
  protected readonly documents = signal<DocumentAcceptance[] | null>(null);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const el = this.dialog().nativeElement;
      if (this.consent.pendingWhatsappUrl() && !el.open) {
        this.terms.set(false);
        this.privacy.set(false);
        this.documents.set(null);
        Promise.all([this.consent.accept('TERMS'), this.consent.accept('PRIVACY')]).then(docs => this.documents.set(docs));
        el.showModal();
      }
    });
  }

  protected continue() {
    const documents = this.documents();
    if (!documents) return;
    this.consent.confirmWhatsapp(documents);
    this.dialog().nativeElement.close();
  }

  protected cancel() {
    this.consent.pendingWhatsappUrl.set(null);
  }
}
