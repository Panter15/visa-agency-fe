import { Component, inject } from '@angular/core';
import { PublicData } from '../../shared/api/public-data';
import { I18n } from '../../shared/i18n/i18n';
import { gsap, useMotion } from '../../shared/motion/motion';
import { Words } from '../../shared/words/words';

@Component({
  selector: 'app-testimonials',
  imports: [Words],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.sass',
})
export class Testimonials {
  protected readonly t = inject(I18n).t;
  // Published testimonials from the API. With none yet, the whole section stays hidden.
  protected readonly stories = inject(PublicData).stories;

  constructor() {
    useMotion(root => {
      if (!this.stories().length) return;
      gsap.from('.title .word', {
        yPercent: 110,
        duration: 1,
        stagger: 0.06,
        ease: 'power4.out',
        scrollTrigger: { trigger: root.querySelector('.head'), start: 'top 80%' },
      });

      // Quotes slide in from alternating sides
      root.querySelectorAll<HTMLElement>('.quotes blockquote').forEach((quote, i) => {
        gsap.from(quote, {
          x: i % 2 === 0 ? -60 : 60,
          autoAlpha: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: quote, start: 'top 85%' },
        });
      });
    }, { deps: () => this.stories() });
  }
}
