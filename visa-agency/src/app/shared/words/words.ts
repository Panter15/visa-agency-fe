import { Component, computed, input } from '@angular/core';

// <h2 [appWords]="text"></h2> renders each word inside a mask,
// so motion code can slide `.word` elements up from below the line.
@Component({
  selector: '[appWords]',
  template: `@for (word of words(); track $index) {<span class="word-mask"><span class="word">{{ word }}</span></span>{{ $last ? '' : ' ' }}}`,
})
export class Words {
  readonly text = input.required<string>({ alias: 'appWords' });
  protected readonly words = computed(() => this.text().trim().split(/\s+/));
}
