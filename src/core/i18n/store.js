import uk from '@/core/i18n/locales/uk';
import ru from '@/core/i18n/locales/ru';

import { keys, LOCALES, localStorageKey, defaultLocale } from '@/core/i18n/keys';
import { detectLocale } from '@/core/i18n/detectLocale';

const isDev = import.meta.env.DEV;

let locale = detectLocale();

const listeners = new Set();

let translations = { uk, ru };

function notify() {
  listeners.forEach((l) => l());
}

function getPluralForm(count) {
  if (locale === 'en') {
    return count === 1 ? 'one' : 'many';
  }
  // ru / uk
  if (count === 0) return 'zero';

  const x = count % 10;
  const y = count % 100;
  
  if (x === 1 && y !== 11) return 'one';
  if (x >= 2 && x <=4 && !(y >= 12 && y <= 14 )) return 'few';
  return 'many';
}

window.addEventListener('storage', e => {
  if (e.key === 'locale' && e.newValue) {
    locale = e.newValue;
    notify();
  }
});

export const i18nStore = {
  locale,
  k: keys,
  locales: LOCALES,
  
  getLocale: () => locale,

  setLocale(newLocale) {
    if (locale === newLocale) return;
    
    locale = newLocale;
    localStorage.setItem(localStorageKey, newLocale);
    notify();
  },

  setTranslations(data) {
    translations = data;
    notify();
  },
    
  subscribe: (cb) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },

  setNamespace(localeKey, namespace, data) {
    if (!translations[localeKey]) {
      translations[localeKey] = {};
    }

    translations[localeKey][namespace] = data;
  },

  formatNumber(value, options = {}) {
    return new Intl.NumberFormat(locale, options).format(value);
  },
  
  formatDate(value, options = {}) {
    return new Intl.DateTimeFormat(locale, options).format(new Date(value));
  },

  t(key, params) {
    if (!key) return '';

    const currentLocale = locale;

    // if (!translations[locale]?.[ns]) {
    //   console.warn(`Namespace '${ns}' not loaded`);
    //   return key;
    // }

    const [ns, ...rest] = key.split('.');
    const path = rest.join('.');

    let value =
      translations[currentLocale]?.[ns]?.[path] ??
      translations[defaultLocale]?.[ns]?.[path] ??
      key;

    // pluralization
    if (params?.count != null && typeof value === 'object') {
      const form = getPluralForm(params.count, currentLocale);
      value = value[form] ?? value.many ?? Object.values(value)[0];
    }

    // interpolation
    if (params && typeof value === 'string') {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(`{{${k}}}`, v);
      });
    }

    if (!value) {
        if (isDev) {
        console.warn('Missing i18n key:', key);
        return `❌ ${key}`;
      }
      return key;
    }

    return value;
  },
};