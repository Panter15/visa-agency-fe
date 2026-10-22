import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Tilt } from '../motion/tilt';

// Open passport, same design as the hero's: a visa on the left page, the entry stamp on the right one.
// .front-cover / .left-leaf (opening) and .stamper / .entry-stamp (stamp landing) are animated by About.
// Without animation (reduced motion) it simply shows open, stamped.
@Component({
  selector: 'app-passport-open',
  imports: [Tilt],
  templateUrl: './passport-open.html',
  styleUrl: './passport-open.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassportOpen {
  readonly label = input.required<string>();
  readonly stampWord = input.required<string>();
  readonly date = input.required<string>();
}
