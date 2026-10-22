import { Component, inject } from '@angular/core';
import { WhatsappGate } from '../../shared/consent/whatsapp-gate';
import { I18n } from '../../shared/i18n/i18n';
import { Icon } from '../../shared/icon/icon';
import { gsap, useMotion } from '../../shared/motion/motion';
import { Tilt } from '../../shared/motion/tilt';
import { Words } from '../../shared/words/words';

@Component({
  selector: 'app-closing',
  imports: [Words, Icon, WhatsappGate, Tilt],
  templateUrl: './closing.html',
  styleUrl: './closing.sass',
})
export class Closing {
  protected readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;

  constructor() {
    useMotion(root => {
      gsap.timeline({ scrollTrigger: { trigger: root.querySelector('.closing-section'), start: 'top 70%' } })
        .from('.closing-title .word', { yPercent: 110, duration: 1.1, stagger: 0.06, ease: 'power4.out' })
        .from('.pass', { x: 120, rotation: 4, autoAlpha: 0, duration: 1.1, ease: 'power3.out' }, '-=0.7')
        .from('.route-line', { scaleX: 0, transformOrigin: 'left center', duration: 0.9, ease: 'power2.inOut' }, '-=0.5')
        .from('.actions > *', { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' }, '-=0.6');
    });
  }
}
