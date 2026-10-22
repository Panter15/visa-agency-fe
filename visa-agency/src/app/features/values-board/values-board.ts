import { Component, inject } from '@angular/core';
import { I18n } from '../../shared/i18n/i18n';
import { Icon } from '../../shared/icon/icon';
import { gsap, useMotion } from '../../shared/motion/motion';

// "Nuestros valores" as a doodle board: value labels around a framed title, sketches in the gaps.
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
      // Values land on the board one by one, each with its own small tilt
      gsap.from(['.board-title', '.value', '.doodle'], {
        y: 30,
        autoAlpha: 0,
        rotation: () => gsap.utils.random(-10, 10),
        duration: 0.7,
        stagger: 0.07,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: root, start: 'top 80%' },
      });
    });
  }
}
