import { Component, inject } from '@angular/core';
import { authGuard } from '../../features/utils/guard/guard';
import { ServiceSession } from '../../features/shared-service/service-session';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.sass',
})
export class Header {
  private readonly serviceSession = inject(ServiceSession);
  isLoggedIn = this.serviceSession.verifySession();
}
