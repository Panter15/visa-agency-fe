import { Component, inject } from '@angular/core';
import { I18n } from '../../shared/i18n/i18n';
import { gsap, useMotion } from '../../shared/motion/motion';
import { Tilt } from '../../shared/motion/tilt';

@Component({
  selector: 'app-story',
  imports: [Tilt],
  templateUrl: './story.html',
  styleUrl: './story.sass',
})
export class Story {
  protected readonly t = inject(I18n).t;

  constructor() {
    useMotion((root, { desktop }) => {
      const section = root.querySelector('.story-section');

      // Words light up one by one as the user reads down the section.
      // They start grey (3.3:1, still readable as large text) and end in their own CSS color.
      gsap.from('.w', {
        color: '#80868f',
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top 70%', end: 'bottom 75%', scrub: true },
      });

      // Illustration follows the same story. Start from the worried state (CSS holds the calm final one).
      gsap.set(['.q', '.night', '.pulse'], { visibility: 'visible' });
      gsap.set('.ok', { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%' });
      gsap.set('.seal', { autoAlpha: 0, scale: 1.8, transformOrigin: '50% 50%' });
      gsap.set('.signature', { strokeDashoffset: 1 });
      gsap.set('.fill', { scaleX: 0, transformOrigin: 'left center' });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        // Desktop: scrubbed with the lines (the illustration is sticky). Mobile: it sits below and plays once.
        scrollTrigger: desktop
          ? { trigger: section, start: 'top 70%', end: 'bottom 75%', scrub: 0.5 }
          : { trigger: root.querySelector('.visual'), start: 'top 75%' },
      });
      tl.from('.sheet', { y: 40, autoAlpha: 0, duration: 1 })                        // forms you don't understand
        .from('.q', { scale: 0, autoAlpha: 0, stagger: 0.15, transformOrigin: '50% 50%', duration: 0.5 }, '<0.3')
        .from('.night', { y: 20, autoAlpha: 0, duration: 1 })                          // doubts at midnight
        .from('.pulse', { strokeDashoffset: 1, autoAlpha: 0, duration: 1.2, ease: 'none' }) // nerves
        .to('.q', { scale: 0, autoAlpha: 0, stagger: 0.12, duration: 0.4 }, '+=0.3')  // you are not alone
        .to('.ok', { scale: 1, autoAlpha: 1, stagger: 0.12, duration: 0.4, ease: 'back.out(2)' }, '<0.1')
        .to('.fill', { scaleX: 1, stagger: 0.12, duration: 0.5 }, '<')
        .to(['.night', '.pulse'], { autoAlpha: 0, duration: 0.6 }, '<')
        // Signed together, and the reviewed seal is pressed onto the form
        .to('.signature', { strokeDashoffset: 0, duration: 0.9, ease: 'power1.inOut' }, '-=0.2')
        .to('.seal', { scale: 1, autoAlpha: 1, duration: 0.35, ease: 'power4.in' });
    });
  }
}
