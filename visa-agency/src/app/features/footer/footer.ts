import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhatsappGate } from '../../shared/consent/whatsapp-gate';
import { I18n } from '../../shared/i18n/i18n';
import { Icon } from '../../shared/icon/icon';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-footer',
  imports: [Logo, RouterLink, WhatsappGate, Icon],
  templateUrl: './footer.html',
  styleUrl: './footer.sass',
})
export class Footer {
  protected readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  protected readonly year = new Date().getFullYear();
  // TODO: Easytravel Visa has no Facebook / Instagram pages yet; put the real page URLs here once they exist
  protected readonly facebookUrl = '#';
  protected readonly instagramUrl = '#';
}
