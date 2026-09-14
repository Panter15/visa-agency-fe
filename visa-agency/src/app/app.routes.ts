import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { Login } from './features/login/login';
import { AdminPerspective } from './features/admin-perspective/admin-perspective';
import { ServiceSession } from './features/shared-service/service-session';

export const routes: Routes = [
      { path: '', component: Landing },
      { path: 'login', component: Login},
      { path: 'admin-perspective', component: AdminPerspective, canActivate: [counterGuard] },
];
