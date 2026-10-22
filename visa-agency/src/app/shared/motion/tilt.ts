import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';
import { DESKTOP, gsap, MOTION_OK } from './motion';

// <svg appTilt> or <div appTilt="10">: the element tilts in 3D toward the pointer while it moves over
// the element's section, like a real object held in the hand. Same feel for every illustration.
// Desktop only (touch has no pointer to follow) and never when the OS asks for reduced motion.
@Directive({ selector: '[appTilt]' })
export class Tilt {
  // Maximum tilt in degrees; '' (plain attribute) means the default
  readonly strength = input(14, { alias: 'appTilt', transform: (v: number | string) => Number(v) || 14 });

  constructor() {
    const el = inject<ElementRef<HTMLElement | SVGElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const media = matchMedia(`${MOTION_OK} and ${DESKTOP}`);
      const zone = el.closest('section') ?? el.parentElement;
      if (!zone) return;

      gsap.set(el, { transformPerspective: 900 });
      const tiltX = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      const tiltY = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3.out' });

      const onMove = (e: PointerEvent) => {
        if (!media.matches || e.pointerType !== 'mouse') return;
        const r = el.getBoundingClientRect();
        const max = this.strength();
        tiltY(gsap.utils.clamp(-max, max, ((e.clientX - (r.left + r.width / 2)) / r.width) * max));
        tiltX(gsap.utils.clamp(-max, max, ((r.top + r.height / 2 - e.clientY) / r.height) * max * 0.75));
      };
      const onLeave = () => {
        tiltX(0);
        tiltY(0);
      };
      zone.addEventListener('pointermove', onMove as EventListener);
      zone.addEventListener('pointerleave', onLeave);
      destroyRef.onDestroy(() => {
        zone.removeEventListener('pointermove', onMove as EventListener);
        zone.removeEventListener('pointerleave', onLeave);
      });
    });
  }
}
