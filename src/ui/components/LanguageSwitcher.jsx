import { useLocale } from '../../contexts/LocaleContext';

export const LanguageSwitcher = ({ compact = false }) => {
  const { locale, setLocale } = useLocale();

  const toggle = () => {
    setLocale(locale === 'uk' ? 'ru' : 'uk');
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
      {locale.toUpperCase()}
    </button>
  );
};