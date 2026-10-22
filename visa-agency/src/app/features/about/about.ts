import { Component, computed, inject } from '@angular/core';
import { I18n } from '../../shared/i18n/i18n';
import { gsap, useMotion } from '../../shared/motion/motion';
import { PassportOpen } from '../../shared/passport-open/passport-open';
import { Words } from '../../shared/words/words';

@Component({
  selector: 'app-about',
  imports: [Words, PassportOpen],
  templateUrl: './about.html',
  styleUrl: './about.sass',
})
export class About {
  private readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  // The entry stamp shows today's date, as if the visitor were arriving now
  protected readonly stampDate = computed(() =>
    new Intl.DateTimeFormat(this.i18n.lang(), { day: '2-digit', month: 'short', year: 'numeric' })
      .format(new Date())
      .replace('.', '')
      .toUpperCase(),
  );

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

      // The passport arrives closed, opens on its spine to the visa page, then an officer-style rubber stamp
      // comes down: ADMITTED. Opening = the front cover folds onto the spine (scaleX 1 → 0), then the inside of
      // the cover with page 06 unfolds from it (0 → 1): a 2D page turn, since SVG has no per-element 3D.
      const center = { transformOrigin: '50% 50%' };
      const spine = { svgOrigin: '240 165' };
      gsap.set('.front-cover', { visibility: 'visible' });
      gsap.set('.left-leaf', { scaleX: 0, ...spine });
      gsap.timeline({ scrollTrigger: { trigger: root.querySelector('.visual'), start: 'top 75%' } })
        .from('.visual', { y: 50, autoAlpha: 0, duration: 1, ease: 'power3.out' })
        .to('.front-cover', { scaleX: 0, ...spine, duration: 0.45, ease: 'power2.in' }, '+=0.15')
        .set('.front-cover', { visibility: 'hidden' })
        .to('.left-leaf', { scaleX: 1, ...spine, duration: 0.55, ease: 'power2.out' })
        // The stamp hovers above the page; its shadow gets sharper as it gets closer
        .fromTo('.stamper', { autoAlpha: 0, y: -160, scale: 1.25, ...center },
          { autoAlpha: 1, y: -40, scale: 1.12, duration: 0.6, ease: 'power2.out' }, '+=0.1')
        .fromTo('.stamper-shadow', { opacity: 0, scale: 1.3, ...center },
          { opacity: 0.25, scale: 1.12, duration: 0.6 }, '<')
        .fromTo('.entry-stamp', { autoAlpha: 0 }, { autoAlpha: 0, duration: 0.01 }, '<')
        .to('.stamper', { y: -52, duration: 0.25, ease: 'sine.inOut' }) // small wind-up
        // Slam
        .to('.stamper', { y: 0, scale: 1, duration: 0.13, ease: 'power4.in' })
        .to('.stamper-shadow', { opacity: 0.55, scale: 1, duration: 0.13, ease: 'power4.in' }, '<')
        .addLabel('impact')
        // Impact: rubber squashes, the passport jolts, ink is on the page
        .to('.stamper', { scaleY: 0.95, scaleX: 1.03, duration: 0.06, yoyo: true, repeat: 1 }, 'impact')
        .to('.open', { y: 4, duration: 0.05, yoyo: true, repeat: 3, ease: 'none' }, 'impact')
        .set('.entry-stamp', { autoAlpha: 1 }, 'impact')
        // Lift away, and the fresh ink settles into the paper
        .to('.stamper', { y: -170, scale: 1.2, autoAlpha: 0, duration: 0.6, ease: 'power2.out' }, 'impact+=0.3')
        .to('.stamper-shadow', { opacity: 0, scale: 1.3, duration: 0.5 }, '<')
        .to('.entry-stamp', { opacity: 0.88, duration: 0.8 }, '<');
    });
  }
}
