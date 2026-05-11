import { i18nStore } from '@/core/i18n/store';
import { parseApiError } from './errorParser';
import { notify } from '@/ui/services/notifyService';

export function handleApiError(err) {
  const { code, message, status } = parseApiError(err);

  let text = '';
  if (code) {
    text = i18nStore.t(`errors.${code}`);
  }

  if (message) {
    text = message;
  }

  if (status === 500) {
    text = i18nStore.t('errors.server');
  }

  text = i18nStore.t('errors.unknown');

  console.log('NOTIFY TEXT:', text);
  notify.error(text);
}