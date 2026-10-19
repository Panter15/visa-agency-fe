import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../shared/header/header';
import { I18n } from '../../shared/i18n/i18n';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-not-found',
  imports: [Header, Footer, RouterLink],
  template: `
    <app-header></app-header>
    <main class="not-found">
      <p class="code" aria-hidden="true">404</p>
      <h1>{{ t().notFound.title }}</h1>
      <p class="text">{{ t().notFound.text }}</p>
      <a class="btn" routerLink="/">{{ t().notFound.cta }} <span class="btn-arrow" aria-hidden="true">→</span></a>
    </main>
    <app-footer></app-footer>
  `,
  styles: `
    :host
      display: block

    .not-found
      min-height: 80vh
      display: flex
      flex-direction: column
      justify-content: center
      align-items: flex-start
      gap: 20px
      max-width: 60ch
      margin: 0 auto
      padding: calc(var(--header-h) + 48px) var(--gutter) 80px

    .code
      margin: 0
      font-family: var(--font-display)
      font-size: clamp(5rem, 18vw, 9rem)
      line-height: 1
      color: var(--accent-text)

    h1
      font-size: clamp(2rem, 5vw, 3rem)

    .text
      margin: 0
      color: var(--ink-soft)
  `,
})
export class NotFound {
  protected readonly t = inject(I18n).t;
}
