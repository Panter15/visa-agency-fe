import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Easytravel Visa logo, redrawn as SVG + live text so it stays sharp and has no background.
// Replace with the designer's original vector file if the client can provide it.
@Component({
  selector: 'app-logo',
  template: `
    <svg class="mark" viewBox="0 0 64 64" aria-hidden="true">
      <!-- Same drawing as public/favicon.svg -->
      <g class="dots">
        <circle cx="17" cy="11" r="1.6" />
        <circle cx="11.5" cy="16" r="2" />
        <circle cx="7.5" cy="22.5" r="2.3" />
        <circle cx="5.5" cy="30" r="2.1" />
        <circle cx="6" cy="37.5" r="1.7" />
      </g>
      <path class="swoosh" d="M15 27 A21 21 0 1 0 52 45" />
      <path class="arrow" d="M17 33 Q 22 17 39 12" />
      <path class="arrow-head" d="M36 6.5 L45 10.5 L38.5 17.5 Z" />
      <path class="check" d="M22 35 L31 46 L57 15" />
      <path class="plane" transform="translate(43 -1) scale(0.8) rotate(45 12 12)"
            d="M2.5 15.5 10 13V6a2 2 0 0 1 4 0v7l7.5 2.5v2.2L14 16v3.5l2.2 1.6V23L12 22l-4.2 1v-1.9l2.2-1.6V16l-7.5 1.7z" />
    </svg>
    <span class="wordmark">
      <span class="line"><b>EASY</b>TRAVEL</span>
      <span class="line"><b>VISA</b>@if (tagline()) {<small>A Trusted Name</small>}</span>
    </span>
  `,
  styles: `
    :host
      display: inline-flex
      align-items: center
      gap: 8px
      --logo-dark: #1b3a6b
      --logo-mid: #2f74bf
      color: var(--logo-dark)
      font-family: var(--font-body)
      line-height: 1

    .mark
      width: 2.6em
      height: 2.6em
      flex: 0 0 auto

    // Light version for dark backgrounds: <app-logo class="inverse">
    :host(.inverse)
      --logo-dark: #f5f1ea
      --logo-mid: #6aa8e0
      --logo-text: #6aa8e0


    .dots
      fill: #7fb4e6

    .arrow
      fill: none
      stroke: #4f9ad8
      stroke-width: 4
      stroke-linecap: round

    .arrow-head
      fill: #4f9ad8

    .swoosh
      fill: none
      stroke: var(--logo-mid)
      stroke-width: 5
      stroke-linecap: round

    .check
      fill: none
      stroke: var(--logo-dark)
      stroke-width: 6
      stroke-linecap: round
      stroke-linejoin: round

    .plane
      fill: var(--logo-mid)

    .wordmark
      display: flex
      flex-direction: column
      gap: 0.12em
      font-size: 1em
      letter-spacing: 0.01em

    .line
      white-space: nowrap
      font-weight: 500
      // Darker than --logo-mid so the letters pass WCAG AA (5.25:1 on paper).
      color: var(--logo-text, #2866a8)

      b
        font-weight: 800
        color: var(--logo-dark)

    small
      margin-left: 0.6em
      font-size: 0.5em
      font-weight: 500
      color: var(--logo-dark)
      letter-spacing: 0.02em
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
  readonly tagline = input(false);
}
