import { Component, inject } from '@angular/core';
import { I18n } from '../../shared/i18n/i18n';
import { gsap, useMotion } from '../../shared/motion/motion';

@Component({
  selector: 'app-story',
  templateUrl: './story.html',
  styleUrl: './story.sass',
})
export class Story {
  protected readonly t = inject(I18n).t;

  constructor() {
    useMotion(root => {
      const section = root.querySelector('.story-section');

      // Words light up one by one as the user reads down the section.
      // They start grey (3.3:1, still readable as large text) and end in their own CSS color.
      gsap.from('.w', {
        color: '#80868f',
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top 70%', end: 'bottom 75%', scrub: true },
      });

      gsap.from('.photo', {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.querySelector('.photo'), start: 'top 85%' },
      });
    });
  }
}
