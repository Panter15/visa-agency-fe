import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsentDialog } from './shared/consent/consent-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConsentDialog],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected title = 'visa-agency';
}
