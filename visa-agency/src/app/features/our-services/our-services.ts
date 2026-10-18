import { Component, inject, signal } from '@angular/core';
import { I18n } from '../../shared/i18n/i18n';
import { gsap, useMotion } from '../../shared/motion/motion';
import { Words } from '../../shared/words/words';

@Component({
  selector: 'app-our-services',
  imports: [Words],
  templateUrl: './our-services.html',
  styleUrl: './our-services.sass',
})
export class OurServices {
  protected readonly t = inject(I18n).t;
  // Step currently on stage — drives the 01/05 counter
  protected readonly active = signal(0);

  constructor() {
    useMotion((root, { desktop }) => {
      const steps = [...root.querySelectorAll<HTMLElement>('.step')];
      const parts = (step: HTMLElement) => ({
        heading: step.querySelectorAll('.step-meta, .step-title'),
        text: step.querySelector('.step-text'),
        you: step.querySelector('.role-you'),
        us: step.querySelector('.role-us'),
      });

      gsap.from('.title .word', {
        yPercent: 110,
        duration: 1,
        stagger: 0.07,
        ease: 'power4.out',
        scrollTrigger: { trigger: root.querySelector('.aside'), start: 'top 80%' },
      });

      gsap.from('.note', {
        y: 30,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.querySelector('.note'), start: 'top 85%' },
      });

      if (!desktop) {
        // Mobile: each step reveals heading → explanation → you → us as it scrolls through
        steps.forEach(step => {
          const p = parts(step);
          gsap.timeline({ scrollTrigger: { trigger: step, start: 'top 85%', end: 'bottom 70%', scrub: 0.5 } })
            .from(p.heading, { y: 30, autoAlpha: 0, stagger: 0.1 })
            .from(p.text, { y: 30, autoAlpha: 0 })
            .from(p.you, { y: 30, autoAlpha: 0 })
            .from(p.us, { y: 30, autoAlpha: 0 });
        });
        return;
      }

      // Desktop: pin the section and play every step as a scene in the same spot.
      // Class is set directly (not via a signal) so the stacked layout exists before ScrollTrigger measures it.
      const section = root.querySelector('.services-section')!;
      section.classList.add('is-staged');
      gsap.set(steps.slice(1), { autoAlpha: 0 });

      const starts: number[] = [];
      const progressFill = root.querySelector('.progress-fill');
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out', duration: 0.6 },
        // On the timeline (not the ScrollTrigger) so it follows the smoothed scrub, not the raw scroll
        onUpdate: () => {
          let index = 0;
          starts.forEach((start, i) => tl.time() >= start && (index = i));
          if (index !== this.active()) this.active.set(index);
          gsap.set(progressFill, { scaleY: tl.progress() });
        },
        scrollTrigger: {
          trigger: root.querySelector('.layout'),
          start: 'top top',
          end: `+=${steps.length * 100}%`,
          pin: true,
          scrub: 0.6,
        },
      });
      steps.forEach((step, i) => {
        const p = parts(step);
        starts.push(tl.duration()); // counter flips as the previous step starts leaving
        if (i > 0) {
          tl.to(steps[i - 1], { y: -40, autoAlpha: 0, duration: 0.5 })
            .set(step, { autoAlpha: 1 })
            .from(p.heading, { y: 40, autoAlpha: 0, stagger: 0.1 });
        }
        tl.from(p.text, { y: 30, autoAlpha: 0 })
          .from(p.you, { y: 30, autoAlpha: 0 }, '+=0.15')
          .from(p.us, { y: 30, autoAlpha: 0 }, '+=0.15')
          .to({}, { duration: 0.6 }); // hold so the full step can be read
      });

      return () => {
        section.classList.remove('is-staged');
        this.active.set(0);
      };
    });
  }

  protected pad(n: number) {
    return String(n).padStart(2, '0');
  }
}
