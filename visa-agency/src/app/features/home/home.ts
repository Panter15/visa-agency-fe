import { Component, inject } from '@angular/core';
import { WhatsappGate } from '../../shared/consent/whatsapp-gate';
import { I18n } from '../../shared/i18n/i18n';
import { Icon } from '../../shared/icon/icon';
import { gsap, useMotion } from '../../shared/motion/motion';
import { Words } from '../../shared/words/words';

// Hero preview: ?hero=empire | golden | window switches the photo (default: Manhattan at dusk).
// Once the owner picks one, keep it and delete the other files in public/images.
const HERO_PHOTOS = ['city', 'empire', 'golden', 'window'] as const;
type HeroPhoto = (typeof HERO_PHOTOS)[number];
const heroParam = new URLSearchParams(location.search).get('hero') as HeroPhoto;

@Component({
  selector: 'app-home',
  imports: [Words, Icon, WhatsappGate],
  templateUrl: './home.html',
  styleUrl: './home.sass',
})
export class Home {
  protected readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  protected readonly photo: HeroPhoto = HERO_PHOTOS.includes(heroParam) ? heroParam : 'city';

  constructor() {
    useMotion((_root, { desktop }) => {
      // Entrance: headline word by word → subtext + CTA → scroll cue
      gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.2 })
        .from('.headline .word', { yPercent: 110, duration: 1.1, stagger: 0.06 })
        .from('.intro > *', { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.2 }, '-=0.7')
        .from('.scroll-hint', { autoAlpha: 0, duration: 0.6 }, '-=0.4');

      // The photo rises into place
      gsap.from('.photo', { y: 60, autoAlpha: 0, duration: 1.1, ease: 'power3.out', delay: 0.5 });

      // The photo drifts up a little while leaving the hero
      gsap.to('.photo', {
        y: -30,
        ease: 'none',
        scrollTrigger: { trigger: '.home-section', start: 'top top', end: 'bottom top', scrub: true },
      });

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
