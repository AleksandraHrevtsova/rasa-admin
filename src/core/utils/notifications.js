import { useI18n } from "@/ui/hooks/useI18n"

export const getCRUDnotification = (pageTag) => {
  const { t, k } = useI18n();
  
  return {
    confirmDeactivate: t(k[pageTag]?.confirmDeactivate) || 'Confirm?',
    successUpdate: t(k[pageTag]?.updated) || 'Updated!',
    successCreate: t(k[pageTag]?.created) || 'Created!',
    successActivate: t(k[pageTag]?.activated) || 'Activated!',
    successDeactivate: t(k[pageTag]?.deactivated) || 'Deactivated!',
  }
}