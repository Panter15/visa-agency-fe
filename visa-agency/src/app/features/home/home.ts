import { Component, inject } from '@angular/core';
import { WhatsappGate } from '../../shared/consent/whatsapp-gate';
import { I18n } from '../../shared/i18n/i18n';
import { Icon } from '../../shared/icon/icon';
import { gsap, useMotion } from '../../shared/motion/motion';
import { PassportScene } from '../../shared/passport-scene/passport-scene';
import { Words } from '../../shared/words/words';

@Component({
  selector: 'app-home',
  imports: [Words, PassportScene, Icon, WhatsappGate],
  templateUrl: './home.html',
  styleUrl: './home.sass',
})
export class Home {
  protected readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;

  constructor() {
    useMotion((root, { desktop }) => {
      // Entrance: headline word by word → subtext + CTA → scroll cue
      gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.2 })
        .from('.headline .word', { yPercent: 110, duration: 1.1, stagger: 0.06 })
        .from('.intro > *', { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.2 }, '-=0.7')
        .from('.scroll-hint', { autoAlpha: 0, duration: 0.6 }, '-=0.4');

      // The passport rises into place, then a light sweeps across the gold foil
      gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.5 })
        .from('.passport', { y: 60, autoAlpha: 0, duration: 1.1 })
        .from('.ground', { autoAlpha: 0, scale: 0.7, transformOrigin: '50% 50%', duration: 1 }, '<')
        .fromTo('.sheen', { x: 0 }, { x: 520, duration: 1.6, ease: 'power2.inOut' }, '-=0.3');

      // The passport drifts up a little while leaving the hero
      gsap.to('.passport', {
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

      // Moves the whole <svg> (.scene), so it never fights the drift above, which moves .passport inside it
      const scene = root.querySelector<SVGElement>('.scene');
      const section = root.querySelector<HTMLElement>('.home-section');
      if (!scene || !section) return;

      if (!desktop) {
        // Touch screens have no pointer to follow: a slow float instead
        gsap.to(scene, { y: -8, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.6 });
        return;
      }

      // Desktop: the passport tilts in 3D toward the pointer, like a real object in the hand
      gsap.set(scene, { transformPerspective: 900 });
      const tiltX = gsap.quickTo(scene, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      const tiltY = gsap.quickTo(scene, 'rotationY', { duration: 0.8, ease: 'power3.out' });
      const onMove = (e: PointerEvent) => {
        const r = scene.getBoundingClientRect();
        tiltY(((e.clientX - (r.left + r.width / 2)) / r.width) * 16);
        tiltX(((r.top + r.height / 2 - e.clientY) / r.height) * 12);
      };
      const onLeave = () => {
        tiltX(0);
        tiltY(0);
      };
      section.addEventListener('pointermove', onMove);
      section.addEventListener('pointerleave', onLeave);
      return () => {
        section.removeEventListener('pointermove', onMove);
        section.removeEventListener('pointerleave', onLeave);
      };
    });
  }
}
