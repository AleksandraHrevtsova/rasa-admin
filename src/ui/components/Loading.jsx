import { useI18n } from '@/ui/hooks/useI18n';
import { SplashScreen } from '@/ui/components/SplashScreen';

export const Loading = () => {
  const { t, k } = useI18n();
  return (
    <div className='p-4'>
      <SplashScreen text={t(k.common.loading)}/>
    </div>
  )
};