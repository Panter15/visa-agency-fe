import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Open passport: the US visa on the left page, the entry stamp on the right page.
// .pages / .entry-stamp are exposed so the parent can animate the stamp landing.
@Component({
  selector: 'app-passport-open',
  templateUrl: './passport-open.html',
  styleUrl: './passport-open.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassportOpen {
  readonly label = input.required<string>();
  readonly stampWord = input.required<string>();
  readonly date = input.required<string>();
}
