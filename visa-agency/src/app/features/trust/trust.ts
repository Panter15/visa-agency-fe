import { Component, computed, inject } from '@angular/core';
import { PublicData } from '../../shared/api/public-data';
import { I18n } from '../../shared/i18n/i18n';
import { Icon } from '../../shared/icon/icon';
import { gsap, useMotion } from '../../shared/motion/motion';
import { Words } from '../../shared/words/words';

@Component({
  selector: 'app-trust',
  imports: [Words, Icon],
  templateUrl: './trust.html',
  styleUrl: './trust.sass',
})
export class Trust {
  private readonly i18n = inject(I18n);
  private readonly data = inject(PublicData);
  protected readonly t = this.i18n.t;

  // Real numbers from the API. Anything still at zero (no records yet) is hidden rather than shown as "0".
  protected readonly stats = computed(() => {
    const stats = this.data.stats();
    if (!stats) return [];
    const labels = this.t().trust.statLabels;
    const label = ([one, many]: string[], value: number) => (value === 1 ? one : many);
    return [
      { value: stats.peopleHelped, decimals: 0, suffix: '', label: label(labels.peopleHelped, stats.peopleHelped) },
      { value: stats.yearsExperience ?? 0, decimals: 0, suffix: '', label: label(labels.yearsExperience, stats.yearsExperience ?? 0) },
      { value: stats.countries, decimals: 0, suffix: '', label: label(labels.countries, stats.countries) },
      { value: stats.averageRating ?? 0, decimals: 1, suffix: '/5', label: label(labels.averageRating, 2) },
    ].filter(stat => stat.value > 0);
  });

  constructor() {
    useMotion(root => {
      gsap.from('.title .word', {
        yPercent: 110,
        duration: 1,
        stagger: 0.07,
        ease: 'power4.out',
        scrollTrigger: { trigger: root.querySelector('.head'), start: 'top 80%' },
      });

      // Numbers count up from 0. We write into Angular's own text node, so the binding stays intact.
      const nums = [...root.querySelectorAll<HTMLElement>('.stat-num')];
      const target = (el: HTMLElement) => [Number(el.dataset['value']), Number(el.dataset['decimals'])] as const;
      nums.forEach(el => {
        const text = el.firstChild as Text;
        const [value, decimals] = target(el);
        const counter = { value: 0 };
        text.nodeValue = this.format(0, decimals);
        gsap.to(counter, {
          value,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: root.querySelector('.stats'), start: 'top 85%' },
          onUpdate: () => {
            text.nodeValue = this.format(counter.value, decimals);
          },
        });
      });

      if (nums.length) {
        gsap.from('.stat, .stats-note', {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.querySelector('.stats'), start: 'top 85%' },
        });
      }

      gsap.from(['.col-title', '.visas li', '.commitments li'], {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.querySelector('.columns'), start: 'top 80%' },
      });

      gsap.from('.embassy', {
        y: 30,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.querySelector('.embassy'), start: 'top 85%' },
      });

      // Restore the real numbers if the animation is torn down mid-count
      return () =>
        nums.forEach(el => {
          (el.firstChild as Text).nodeValue = this.format(...target(el));
        });
    }, { deps: () => this.stats() });
  }

  protected format(n: number, decimals: number) {
    return new Intl.NumberFormat(this.i18n.lang(), {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(decimals ? n : Math.round(n));
  }
}
