import { useI18n } from '@/ui/hooks/useI18n';

export const useCRUDnotification = (entity) => {
  const { t, k } = useI18n();

  return {
    confirmDeactivateTitleKey: k[entity]?.confirmDeactivateTitle,
    confirmDeactivateDescKey: k[entity]?.confirmDeactivateDesc,
    confirmActivateTitleKey: k[entity]?.confirmActivateTitle,
    confirmActivateDescKey: k[entity]?.confirmActivateDesc,
    confirmDeactivate: t(k[entity]?.confirmDeactivate) || 'Confirm?',
    successUpdate: t(k[entity]?.updated) || 'Updated!',
    successCreate: t(k[entity]?.created) || 'Created!',
    requestError: 'Помилка запиту',
    emailAlreadyExist: 'Такая почта уже используется!',
    phoneAlreadyExist: 'Такой номер телефона уже зарегитсрирован!',
    successActivate: t(k[entity]?.activated) || 'Activated!',
    successDeactivate: t(k[entity]?.deactivated) || 'Deactivated!',
  };
};