import { TestBed } from '@angular/core/testing';

import { ServiceSession } from './service-session';

// A JWT with only the `exp` claim (seconds since 1970). The signature isn't checked here: that's the backend's job.
const tokenExpiringIn = (seconds: number) =>
  `x.${btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + seconds }))}.x`;

describe('ServiceSession', () => {
  let service: ServiceSession;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSession);
  });

  afterEach(() => localStorage.clear());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('treats an unexpired token as admin', () => {
    service.sessionAuth(tokenExpiringIn(3600));
    expect(service.isAdmin()).toBeTrue();
    expect(service.verifySession()).toBeTrue();
  });

  it('rejects and clears an expired token', () => {
    service.sessionAuth(tokenExpiringIn(-60));
    expect(service.isAdmin()).toBeFalse();
    expect(service.verifySession()).toBeFalse();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('rejects a malformed token', () => {
    service.sessionAuth('not-a-jwt');
    expect(service.isAdmin()).toBeFalse();
  });
});
