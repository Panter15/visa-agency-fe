import { computed, Injectable, signal } from '@angular/core';

// The backend only issues tokens to rows in the `admin` table, so a valid,
// unexpired token means "admin". This is UI-only — the backend JWT check is the real security boundary.
function isUnexpired(token: string | null): boolean {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return typeof payload.exp === 'number' && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ServiceSession {
  private readonly token = signal(localStorage.getItem('token'));
  readonly isAdmin = computed(() => isUnexpired(this.token()));

  sessionAuth(token: string) {
    localStorage.setItem('token', token);
    this.token.set(token);
  }

  verifySession() {
    const valid = isUnexpired(this.token());
    if (!valid && this.token()) this.logoutSession();
    return valid;
  }

  logoutSession() {
   localStorage.removeItem('token');
   this.token.set(null);
  }
}
