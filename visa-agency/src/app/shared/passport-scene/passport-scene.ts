import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Hero illustration: a passport, the US visa that slides out of it, and an entry stamp.
// Each part has its own class (.passport, .visa, .stamp) so the hero can animate them separately.
@Component({
  selector: 'app-passport-scene',
  templateUrl: './passport-scene.html',
  styleUrl: './passport-scene.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassportScene {
  readonly label = input.required<string>();
  protected readonly year = new Date().getFullYear();
}
