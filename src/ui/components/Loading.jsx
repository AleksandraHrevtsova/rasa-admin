import { useLocale } from '../../contexts/LocaleContext';

export const Loading = () => {
  const { t } = useLocale();
  return (
    <div className='p-4'>{t['loading']}</div>
  )
};