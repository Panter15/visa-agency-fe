import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceSession {
  
  sessionAuth(token: string) {
    localStorage.setItem('token', token);
  }

  verifySession(){
    return !!localStorage.getItem('token');
  }

  logoutSession() {
   localStorage.removeItem('token');
  }
}
