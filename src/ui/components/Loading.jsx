import { useI18n } from '@/ui/hooks/useI18n';

export const Loading = () => {
  const { t, k } = useI18n();
  return (
    <div className='p-4'>{t(k.common.loading)}</div>
  )
};