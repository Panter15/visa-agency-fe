import { Component, inject } from '@angular/core';
import { I18n } from '../../shared/i18n/i18n';
import { gsap, useMotion } from '../../shared/motion/motion';
import { Words } from '../../shared/words/words';

@Component({
  selector: 'app-about',
  imports: [Words],
  templateUrl: './about.html',
  styleUrl: './about.sass',
})
export class About {
  private readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;

  constructor() {
    useMotion(root => {
      gsap.from('.title .word', {
        yPercent: 110,
        duration: 1,
        stagger: 0.07,
        ease: 'power4.out',
        scrollTrigger: { trigger: root.querySelector('.head'), start: 'top 80%' },
      });

      gsap.from(['.lead', '.text'], {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.querySelector('.body'), start: 'top 80%' },
      });

      gsap.from('.photo', {
        y: 50,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.querySelector('.photo'), start: 'top 85%' },
      });
    });
  }
}
