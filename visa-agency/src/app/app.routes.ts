import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';


export const routes: Routes = [
      { path: '', component: Landing },
      // /login and /admin-perspective come back (with authGuard) once those pages are built; they were empty placeholders.
      { path: 'privacidad', loadComponent: () => import('./features/legal/legal').then(m => m.Legal), data: { page: 'privacy' } },
      { path: 'terminos', loadComponent: () => import('./features/legal/legal').then(m => m.Legal), data: { page: 'terms' } },
      { path: 'reembolsos', loadComponent: () => import('./features/legal/legal').then(m => m.Legal), data: { page: 'refund' } },
      // Private hiring link sent by the agency; the token identifies the case.
      { path: 'aceptar/:token', loadComponent: () => import('./features/acceptance/acceptance').then(m => m.Acceptance) },
      // Must stay last: catches every URL that matched nothing above.
      { path: '**', loadComponent: () => import('./features/not-found/not-found').then(m => m.NotFound) },
];
