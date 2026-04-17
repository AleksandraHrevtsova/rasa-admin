import { useI18n } from '@/ui/hooks/useI18n';

export const LanguageSwitcher = ({ compact = false }) => {
  const { locale, locales: { UK, RU}, setLocale } = useI18n();
  
  const toggle = () => {
    setLocale(locale === UK ? RU : UK);
  };

  return (
    <button
      onClick={toggle}
      className={`
        text-xs font-medium px-2 py-1 rounded
        border
        ${compact ? 'text-[10px]' : ''}
      `}
    >
      {locale?.toUpperCase()}
    </button>
  );
};