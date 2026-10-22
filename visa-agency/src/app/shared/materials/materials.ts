import { ChangeDetectionStrategy, Component } from '@angular/core';

// Shared "materials" for every illustration (hero passport, open passport, DS-160 form):
// defined once here, used anywhere in the page as url(#et-gold), url(#et-grain)…
// SVG ids are global to the document, so this hidden <svg> lives once, in the app root.
@Component({
  selector: 'app-materials',
  template: `
    <svg width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <!-- Gold foil: several warm stops read as polished metal -->
        <linearGradient id="et-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#a8823a" />
          <stop offset="0.35" stop-color="#f3dc9a" />
          <stop offset="0.55" stop-color="#c49a45" />
          <stop offset="0.78" stop-color="#f7e6ad" />
          <stop offset="1" stop-color="#9b7731" />
        </linearGradient>
        <!-- Leather grain: fine light noise, kept only where the shape is -->
        <filter id="et-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.09 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <!-- Soft contact shadow under objects -->
        <filter id="et-blur" x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
    </svg>
  `,
  styles: `
    svg
      position: absolute
      width: 0
      height: 0
      overflow: hidden
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Materials {}
