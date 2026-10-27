import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServiceSession } from '../../features/shared-service/service-session';
import { PublicData } from '../api/public-data';
import { Logo } from '../logo/logo';
import { I18n } from '../i18n/i18n';
import { WhatsappGate } from '../consent/whatsapp-gate';
import { gsap, ScrollTrigger, useMotion } from '../motion/motion';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Logo, WhatsappGate],
  templateUrl: './header.html',
  styleUrl: './header.sass',
})
export class Header {
  private readonly serviceSession = inject(ServiceSession);
  private readonly router = inject(Router);
  protected readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;

  // Admin link only appears once a valid admin token exists.
  readonly isAdmin = this.serviceSession.isAdmin;
  readonly menuOpen = signal(false);
  // "Stories" link only when there are published testimonials to land on.
  private readonly stories = inject(PublicData).stories;
  protected readonly hasStories = computed(() => this.stories().length > 0);

  constructor() {
    useMotion(root => {
      const header = root.querySelector('.site-header')!;
      gsap.from(header, { yPercent: -100, autoAlpha: 0, duration: 0.9, ease: 'power3.out' });

      // Hide on scroll down, show on scroll up.
      let hidden = false;
      const show = (visible: boolean) => {
        if (hidden === !visible) return;
        hidden = !visible;
        gsap.to(header, { yPercent: hidden ? -100 : 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
      };
      ScrollTrigger.create({
        start: 'top -120',
        end: 'max',
        onUpdate: self => show(self.direction === -1 || this.menuOpen()),
        onLeaveBack: () => show(true),
      });
    }, { replayOnLanguage: false });
  }

  toggleMenu() {
    this.setMenu(!this.menuOpen());
  }

  closeMenu() {
    this.setMenu(false);
  }

  // Stop the page from scrolling behind the open mobile menu. Toggled right away, not in an effect:
  // a menu link's click reaches Lenis next, and it can't scroll to the section while the page is still locked.
  private setMenu(open: boolean) {
    this.menuOpen.set(open);
    document.documentElement.classList.toggle('menu-locked', open);
  }

  logout() {
    this.serviceSession.logoutSession();
    this.closeMenu();
    this.router.navigate(['/']);
  }
}
