import { Component, inject } from '@angular/core';
import { I18n } from '../../shared/i18n/i18n';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-footer',
  imports: [Logo],
  templateUrl: './footer.html',
  styleUrl: './footer.sass',
})
export class Footer {
  protected readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  protected readonly year = new Date().getFullYear();
}
