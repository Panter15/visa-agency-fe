import { TestBed } from '@angular/core/testing';

import { ServiceSession } from './service-session';

describe('ServiceSession', () => {
  let service: ServiceSession;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSession);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
