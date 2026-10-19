import { Directive, inject } from '@angular/core';
import { Consent } from './consent';

// <a appWhatsappGate [href]="i18n.whatsappUrl()">: the first click asks for Terms + Privacy before opening WhatsApp.
// Once the current versions are accepted in this browser, the link works normally.
@Directive({
  selector: 'a[appWhatsappGate]',
  host: { '(click)': 'onClick($event)' },
})
export class WhatsappGate {
  private readonly consent = inject(Consent);

  protected onClick(event: MouseEvent) {
    if (this.consent.hasWhatsappConsent()) return;
    event.preventDefault();
    this.consent.pendingWhatsappUrl.set((event.currentTarget as HTMLAnchorElement).href);
  }
}
