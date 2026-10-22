import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Laurel wreath around the crest: leaves along an arc, each turned to follow the circle.
function laurel(radius: number, from: number, to: number, count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const deg = from + ((to - from) * i) / (count - 1);
    const rad = (deg * Math.PI) / 180;
    return `translate(${(radius * Math.cos(rad)).toFixed(1)} ${(radius * Math.sin(rad)).toFixed(1)}) rotate(${(deg + 115).toFixed(0)})`;
  });
}

// Hero illustration: a premium passport (navy leather, gold foil, the agency's crest, ribbon bookmark).
// .passport and .sheen are animated by the hero (features/home/home.ts).
@Component({
  selector: 'app-passport-scene',
  templateUrl: './passport-scene.html',
  styleUrl: './passport-scene.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassportScene {
  readonly label = input.required<string>();
  // Left arc (bottom → top) and its mirror on the right, open at the top like a real wreath
  protected readonly leaves = [...laurel(62, 110, 235, 9), ...laurel(62, 70, -55, 9)];
}
