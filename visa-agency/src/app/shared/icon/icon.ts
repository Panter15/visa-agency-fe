import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Minimal line icons, drawn with currentColor so they take the text color around them.
@Component({
  selector: 'app-icon',
  template: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      @switch (name()) {
        @case ('passport') {
          <rect x="5" y="2.5" width="14" height="19" rx="2" />
          <circle cx="12" cy="10" r="3.5" />
          <path d="M8.5 10h7M12 6.5c1.4 1.2 1.4 5.8 0 7M12 6.5c-1.4 1.2-1.4 5.8 0 7M9 17h6" />
        }
        @case ('plane') {
          <path d="M2.5 15.5 10 13V6a2 2 0 0 1 4 0v7l7.5 2.5v2.2L14 16v3.5l2.2 1.6V23L12 22l-4.2 1v-1.9l2.2-1.6V16l-7.5 1.7z" />
        }
        @case ('chat') {
          <path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3.5V17.5H4A1.5 1.5 0 0 1 2.5 16V7A1.5 1.5 0 0 1 4 5.5z" />
          <path d="M7 10h10M7 13.5h6" />
        }
        @case ('alert') {
          <path d="M10.3 3.9 2.4 17.7A2 2 0 0 0 4.1 20.7h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
          <path d="M12 9v4.5M12 17h.01" />
        }
        @case ('renew') {
          <path d="M19.5 10.5A8 8 0 0 0 5.2 7.2L4 8.5M4 3.5v5h5" />
          <path d="M4.5 13.5a8 8 0 0 0 14.3 3.3l1.2-1.3M20 20.5v-5h-5" />
        }
        @case ('family') {
          <circle cx="8" cy="6.5" r="2.5" />
          <circle cx="16.5" cy="9" r="2" />
          <path d="M3.5 20.5v-3.5a4.5 4.5 0 0 1 9 0v3.5M13 20.5v-2.5a3.5 3.5 0 0 1 7 0v2.5" />
        }
        @case ('leaf') {
          <path d="M12 21.5v-5M12 16.5 6 18l1-3-4-3.5 2-.5-1-4 3.5 1.5L8 6l2 1.5L12 2.5l2 5 2-1.5.5 2.5 3.5-1.5-1 4 2 .5-4 3.5 1 3z" />
        }
      }
    </svg>
  `,
  styles: `
    :host
      display: inline-flex
      width: 1.5em
      height: 1.5em

    svg
      width: 100%
      height: 100%
      fill: none
      stroke: currentColor
      stroke-width: 1.4
      stroke-linecap: round
      stroke-linejoin: round
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<string>();
}
