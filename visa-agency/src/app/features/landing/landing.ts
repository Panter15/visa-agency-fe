import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Home } from '../home/home';
import { OurServices } from '../our-services/our-services';
import { About } from '../about/about';
import { Testimonials } from '../testimonials/testimonials';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-landing',
  imports: [Header, Home, About, OurServices, Testimonials, Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.sass',
})
export class Landing {

}
