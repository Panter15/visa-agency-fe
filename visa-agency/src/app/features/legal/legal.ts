import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header } from '../../shared/header/header';
import { I18n } from '../../shared/i18n/i18n';
import { Footer } from '../footer/footer';

// One page for every legal text; the route's `data.page` picks which one.
@Component({
  selector: 'app-legal',
  imports: [Header, Footer, RouterLink],
  templateUrl: './legal.html',
  styleUrl: './legal.sass',
})
export class Legal {
  private readonly page: 'privacy' | 'terms' | 'refund' = inject(ActivatedRoute).snapshot.data['page'];
  private readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  protected readonly doc = computed(() => this.t().legal[this.page]);
  // The version is the date it took effect (YYYY-MM-DD); noon UTC so no time zone shows the previous day.
  protected readonly versionDate = computed(() =>
    new Intl.DateTimeFormat(this.i18n.lang(), { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(this.doc().version + 'T12:00:00Z')),
  );
}
