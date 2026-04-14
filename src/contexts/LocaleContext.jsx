import { createContext, useContext, useState, useEffect } from 'react';
import uk from '../core/i18n/translations/uk.json';
import ru from '../core/i18n/translations/ru.json';

const locales = { uk, ru };

const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState('uk');
  const [t, setT] = useState(locales[locale]);

  useEffect(() => {
    setT(locales[locale]);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);