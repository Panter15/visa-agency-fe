import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { I18n } from '../i18n/i18n';
import { Consent } from './consent';

describe('Consent', () => {
  let consent: Consent;
  let legal: ReturnType<I18n['t']>['legal'];

  // Accept in the dialog while the server answers with `status`, and wait for the background save to settle.
  async function acceptWithServerStatus(status: number) {
    const fetchSpy = spyOn(window, 'fetch').and.resolveTo(new Response(null, { status }));
    consent.pendingWhatsappUrl.set('https://wa.me/1');
    consent.confirmWhatsapp([]);
    await fetchSpy.calls.mostRecent().returnValue;
    await Promise.resolve();
  }

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    consent = TestBed.inject(Consent);
    legal = TestBed.inject(I18n).t().legal;
    spyOn(window, 'open');
  });

  afterEach(() => localStorage.clear());

  it('asks again when the Terms or Privacy version changed', () => {
    const store = (privacy: string) =>
      localStorage.setItem('consent', JSON.stringify({ anonymousId: 'test', terms: legal.terms.version, privacy }));

    store(legal.privacy.version);
    expect(consent.hasWhatsappConsent()).toBeTrue();

    store('an-older-version');
    expect(consent.hasWhatsappConsent()).toBeFalse();
  });

  it('does not remember the acceptance when the server did not store it', async () => {
    // e.g. a static host with no API answers 405: the dialog must show again next time
    await acceptWithServerStatus(405);
    expect(consent.hasWhatsappConsent()).toBeFalse();
  });

  it('remembers the acceptance once the server stored it', async () => {
    await acceptWithServerStatus(201);
    expect(consent.hasWhatsappConsent()).toBeTrue();
  });
});
