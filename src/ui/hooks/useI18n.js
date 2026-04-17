import { useSyncExternalStore } from 'react';
import { i18nStore } from '@/core/i18n/store';

export function useI18n() {
  const locale = useSyncExternalStore(i18nStore.subscribe, i18nStore.getLocale);

  return {
    t: i18nStore.t,
    k: i18nStore.k,
    locale,
    locales: i18nStore.locales,
    setLocale: i18nStore.setLocale,
  };
}