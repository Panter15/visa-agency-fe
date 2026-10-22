import { Component, inject } from '@angular/core';
import { I18n } from '../../shared/i18n/i18n';
import { gsap, useMotion } from '../../shared/motion/motion';

// "Nuestros valores": six values shown as passport entry stamps, under the commitments.
@Component({
  selector: 'app-values-board',
  templateUrl: './values-board.html',
  styleUrl: './values-board.sass',
})
export class ValuesBoard {
  protected readonly t = inject(I18n).t;

  constructor() {
    useMotion(root => {
      gsap.from('.board-title', {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 80%' },
      });
      // Each stamp lands like a rubber stamp: slightly larger, then pressed flat onto the page
      gsap.from('.stamp', {
        // 1.06, not more: a bigger start size sticks out past a phone's edge until the stamp lands
        scale: 1.06,
        autoAlpha: 0,
        duration: 0.35,
        stagger: 0.12,
        ease: 'power4.in',
        scrollTrigger: { trigger: root, start: 'top 75%' },
      });
    });
  }
}
