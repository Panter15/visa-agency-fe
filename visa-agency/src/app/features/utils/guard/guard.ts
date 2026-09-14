import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { ServiceSession } from "../../shared-service/service-session";

  export const authGuard: CanActivateFn = () => {
    const authService = inject(ServiceSession);
    return authService.verifySession();
  }
