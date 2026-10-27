import { afterNextRender, Component, DestroyRef, inject } from '@angular/core';
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

    // Smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync with Lenis.
    afterNextRender(() => {
      if (!matchMedia(MOTION_OK).matches) return;

      const lenis = new Lenis();
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // In-page links (…/#about) scroll through Lenis: a native jump would be pulled back by its own scroll position.
      // Matched by path, not Lenis' `anchors` option, which misses hrefs under a base path (/visa-agency-fe/#about).
      // Offset = the fixed header, like scroll-padding-top does for native scrolling.
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 0;
      const onClick = (event: MouseEvent) => {
        const link = (event.target as Element).closest?.('a[href*="#"]') as HTMLAnchorElement | null;
        if (!link || link.pathname !== location.pathname || !link.hash) return;
        const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
        if (target) lenis.scrollTo(target, { offset: -header });
      };
      document.addEventListener('click', onClick);

      destroyRef.onDestroy(() => {
        document.removeEventListener('click', onClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
      });
    });
  }
}
