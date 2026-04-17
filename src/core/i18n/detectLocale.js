import { SUPPORTED_LOCALES, localStorageKey, defaultLocale } from '@/core/i18n/keys';

export function detectLocale() {
  const saved = localStorage.getItem(localStorageKey);
  if (saved && SUPPORTED_LOCALES.includes(saved)) {
    return saved;
  }

  const browserLang = navigator.language?.slice(0, 2);

  if (SUPPORTED_LOCALES.includes(browserLang)) {
    return browserLang;
  }

  return defaultLocale;
};