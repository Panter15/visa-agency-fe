import { afterNextRender, Component, DestroyRef, inject, NgZone } from '@angular/core';
import Lenis from 'lenis';
import { Header } from '../../shared/header/header';
import { Home } from '../home/home';
import { Story } from '../story/story';
import { OurServices } from '../our-services/our-services';
import { About } from '../about/about';
import { Trust } from '../trust/trust';
import { Testimonials } from '../testimonials/testimonials';
import { Closing } from '../closing/closing';
import { Footer } from '../footer/footer';
import { gsap, MOTION_OK, ScrollTrigger } from '../../shared/motion/motion';

@Component({
  selector: 'app-landing',
  imports: [Header, Home, Story, OurServices, About, Trust, Testimonials, Closing, Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.sass',
})
export class Landing {
  constructor() {
    const destroyRef = inject(DestroyRef);
    const zone = inject(NgZone);

    // Smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync with Lenis.
    afterNextRender(() => {
      if (!matchMedia(MOTION_OK).matches) return;

      zone.runOutsideAngular(() => {
        const lenis = new Lenis();
        lenis.on('scroll', ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        destroyRef.onDestroy(() => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        });
      });
    });
  }
}
