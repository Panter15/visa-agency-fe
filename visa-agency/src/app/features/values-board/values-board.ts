import { Component, inject } from '@angular/core';
import { I18n } from '../../shared/i18n/i18n';
import { Icon } from '../../shared/icon/icon';
import { gsap, useMotion } from '../../shared/motion/motion';

// "Nuestros valores": six value cards (icon, name, one line) under the commitments.
@Component({
  selector: 'app-values-board',
  imports: [Icon],
  templateUrl: './values-board.html',
  styleUrl: './values-board.sass',
})
export class ValuesBoard {
  protected readonly t = inject(I18n).t;

  constructor() {
    useMotion(root => {
      // Cards rise in one after another, like the rest of the section
      gsap.from(['.board-title', '.value'], {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 80%' },
      });
    });
  }
}
