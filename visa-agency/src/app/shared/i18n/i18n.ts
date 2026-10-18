import { computed, effect, Injectable, signal } from '@angular/core';
import { COPY, Lang } from './copy';

// Placeholder number — replace with the agency's real WhatsApp number (digits only, with country code).
const WHATSAPP_NUMBER = '15551234567';

const STORAGE_KEY = 'lang';

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {}
  return navigator.language.startsWith('en') ? 'en' : 'es';
}

@Injectable({
  providedIn: 'root',
})
export class I18n {
  readonly lang = signal<Lang>(initialLang());
  readonly t = computed(() => COPY[this.lang()]);
  readonly whatsappUrl = computed(
    () => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(this.t().whatsappMessage)}`,
  );

  constructor() {
    effect(() => {
      document.documentElement.lang = this.lang();
      document.title = this.t().meta.title;
      try {
        localStorage.setItem(STORAGE_KEY, this.lang());
      } catch {}
    });
  }

  toggle() {
    this.lang.update(lang => (lang === 'es' ? 'en' : 'es'));
  }
}
