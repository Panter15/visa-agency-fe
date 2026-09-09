import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Landing } from './features/landing/landing';

@Component({
  selector: 'app-root',
  imports: [Landing],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected title = 'visa-agency';
}
