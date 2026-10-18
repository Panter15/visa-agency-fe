import { afterNextRender, DestroyRef, effect, ElementRef, inject, Injector, NgZone } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { I18n } from '../i18n/i18n';

gsap.registerPlugin(ScrollTrigger);

// Animations only run when the user has NOT asked the OS to reduce motion.
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const DESKTOP = '(min-width: 901px)';

// Pins add scroll height, so once every component has (re)built its triggers, re-measure them all — once per frame.
let refreshQueued = false;
function queueRefresh() {
  if (refreshQueued) return;
  refreshQueued = true;
  requestAnimationFrame(() => {
    refreshQueued = false;
    ScrollTrigger.refresh();
  });
}

export interface MotionConditions {
  desktop: boolean;
}

// Call from a component's constructor.
// Runs `setup` once the component's HTML is on screen, scoped to the component,
// and reverts every tween/ScrollTrigger it created when the component is destroyed.
// By default it re-runs after a language switch, because the text (and its word spans) changed.
// It also re-runs when the screen crosses the desktop breakpoint; `setup` may return a cleanup function.
// `deps` lists signals whose change adds/removes elements (e.g. data loaded from the API), so the motion is rebuilt.
export function useMotion(
  setup: (root: HTMLElement, conditions: MotionConditions) => void | (() => void),
  { replayOnLanguage = true, deps = () => undefined as unknown } = {},
) {
  const host = inject<ElementRef<HTMLElement>>(ElementRef);
  const injector = inject(Injector);
  const zone = inject(NgZone);
  const i18n = inject(I18n);
  let mm: gsap.MatchMedia | undefined;

  const run = () =>
    afterNextRender(
      () =>
        // GSAP ticks every frame — keep it out of Angular change detection.
        zone.runOutsideAngular(() => {
          mm?.revert();
          mm = gsap.matchMedia();
          mm.add({ motion: MOTION_OK, desktop: DESKTOP }, ctx => {
            const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
            if (motion) return setup(host.nativeElement, { desktop });
            return;
          }, host.nativeElement);
          queueRefresh();
        }),
      { injector },
    );

  effect(() => {
    if (replayOnLanguage) i18n.lang();
    deps();
    run();
  });

  inject(DestroyRef).onDestroy(() => mm?.revert());
}

export { gsap, ScrollTrigger };
