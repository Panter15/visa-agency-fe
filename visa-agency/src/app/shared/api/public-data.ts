import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

// Counted by the backend from real records (client cases, published testimonials).
export interface PublicStats {
  peopleHelped: number;
  yearsExperience: number | null;
  countries: number;
  averageRating: number | null;
  publishedStories: number;
}

export interface Story {
  id: number;
  clientName: string;
  content: string;
  visaType: string | null;
  rating: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class PublicData {
  private readonly http = inject(HttpClient);

  // Stay empty until the API answers. If it never does, the page hides these blocks instead of inventing numbers.
  readonly stats = signal<PublicStats | null>(null);
  readonly stories = signal<Story[]>([]);

  constructor() {
    this.http.get<PublicStats>(`${environment.apiUrl}/public/stats`).subscribe({
      next: stats => this.stats.set(stats),
      error: () => this.stats.set(null),
    });
    this.http.get<Story[]>(`${environment.apiUrl}/testimonials`).subscribe({
      next: stories => this.stories.set(stories),
      error: () => this.stories.set([]),
    });
  }
}
