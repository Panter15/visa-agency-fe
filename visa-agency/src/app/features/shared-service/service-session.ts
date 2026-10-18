import { computed, effect, Injectable, signal } from '@angular/core';

// The backend only issues tokens to rows in the `admin` table, so a valid,
// unexpired token means "admin". This is UI-only — the backend JWT check is the real security boundary.

// Expiry of the JWT in milliseconds, or null if there is no readable token.
function expiryOf(token: string | null): number | null {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return typeof payload.exp === 'number' ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

function isUnexpired(token: string | null): boolean {
  const expiry = expiryOf(token);
  return expiry !== null && expiry > Date.now();
}

// setTimeout can't wait longer than ~24.8 days
const MAX_TIMEOUT = 2 ** 31 - 1;

@Injectable({
  providedIn: 'root',
})
export class ServiceSession {
  private readonly token = signal(localStorage.getItem('token'));
  readonly isAdmin = computed(() => isUnexpired(this.token()));

  constructor() {
    // `isAdmin` only re-checks when the token changes, so log out exactly when it expires.
    // Otherwise the admin links would stay on screen after the session is over.
    effect(onCleanup => {
      const expiry = expiryOf(this.token());
      if (expiry === null) return;
      const timer = setTimeout(() => this.logoutSession(), Math.min(Math.max(0, expiry - Date.now()), MAX_TIMEOUT));
      onCleanup(() => clearTimeout(timer));
    });
  }

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
