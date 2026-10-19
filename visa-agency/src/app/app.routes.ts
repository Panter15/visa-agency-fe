import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { authGuard } from './features/utils/guard/guard';


export const routes: Routes = [
      { path: '', component: Landing },
      { path: 'login', loadComponent: () => import('./features/login/login').then(m => m.Login) },
      { path: 'admin-perspective', loadComponent: () => import('./features/admin-perspective/admin-perspective').then(m => m.AdminPerspective), canActivate: [authGuard] },
      { path: 'privacidad', loadComponent: () => import('./features/legal/legal').then(m => m.Legal), data: { page: 'privacy' } },
      { path: 'terminos', loadComponent: () => import('./features/legal/legal').then(m => m.Legal), data: { page: 'terms' } },
      { path: 'reembolsos', loadComponent: () => import('./features/legal/legal').then(m => m.Legal), data: { page: 'refund' } },
      // Private hiring link sent by the agency; the token identifies the case.
      { path: 'aceptar/:token', loadComponent: () => import('./features/acceptance/acceptance').then(m => m.Acceptance) },
      // Must stay last: catches every URL that matched nothing above.
      { path: '**', loadComponent: () => import('./features/not-found/not-found').then(m => m.NotFound) },
];
