import { Component, inject } from '@angular/core';
import { WhatsappGate } from '../../shared/consent/whatsapp-gate';
import { I18n } from '../../shared/i18n/i18n';
import { Icon } from '../../shared/icon/icon';
import { gsap, useMotion } from '../../shared/motion/motion';
import { PassportScene } from '../../shared/passport-scene/passport-scene';
import { Words } from '../../shared/words/words';

@Component({
  selector: 'app-home',
  imports: [Words, PassportScene, Icon, WhatsappGate],
  templateUrl: './home.html',
  styleUrl: './home.sass',
})
export class Home {
  protected readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;

  constructor() {
    useMotion(() => {
      // Entrance: eyebrow → headline word by word → subtext + CTA → scroll hint
      gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.2 })
        .from('.eyebrow', { y: 20, autoAlpha: 0, duration: 0.8 })
        .from('.headline .word', { yPercent: 110, duration: 1.1, stagger: 0.06 }, '-=0.5')
        .from('.intro > *', { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.2 }, '-=0.7')
        .from('.scroll-hint', { autoAlpha: 0, duration: 0.6 }, '-=0.4');

      // The illustration tells a tiny story: passport arrives → visa slides out of it → entry stamp lands
      gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.5 })
        .from('.passport', { y: 60, rotation: -6, autoAlpha: 0, duration: 1.1, transformOrigin: '50% 50%' })
        .from('.visa', { x: -80, autoAlpha: 0, duration: 1 }, '-=0.4')
        .from('.route', { strokeDashoffset: 120, autoAlpha: 0, duration: 1.2, ease: 'none' }, '-=0.6')
        .from('.stamp', { scale: 1.8, autoAlpha: 0, duration: 0.45, ease: 'back.out(2)', transformOrigin: '50% 50%' }, '-=0.6');

      // Layers drift at different speeds while leaving the hero, which gives the scene depth
      const scrub = () => ({ trigger: '.home-section', start: 'top top', end: 'bottom top', scrub: true });
      gsap.to('.passport', { y: -30, ease: 'none', scrollTrigger: scrub() });
      gsap.to('.visa', { y: -80, rotation: 3, ease: 'none', scrollTrigger: scrub() });
      gsap.to('.stamp-wrap', { y: -140, ease: 'none', scrollTrigger: scrub() });

      // Headline drifts up and fades as the user scrolls past the hero
      gsap.to('.headline', {
        yPercent: -20,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: '.home-section', start: 'top top', end: 'bottom top', scrub: true },
      });
    });
  }
}
