import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsentDialog } from './shared/consent/consent-dialog';
import { Materials } from './shared/materials/materials';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConsentDialog, Materials],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected title = 'visa-agency';
}
