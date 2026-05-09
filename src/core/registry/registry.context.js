import { NAV, pageTags } from '@/config/constants';
import { i18nStore } from '@/core/i18n/store';

export const createRegistryContext = () => {
  const { k } = i18nStore;

  return {
    nav: NAV,
    pageTags,
    k,
  };
};