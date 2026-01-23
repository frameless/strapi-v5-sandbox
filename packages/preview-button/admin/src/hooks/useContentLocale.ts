import { useEffect, useState } from 'react';

export const useContentLocale = () => {
  const [locale, setLocale] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const params = new URLSearchParams(window.location.search);
      setLocale(params.get('plugins[i18n][locale]'));
    };

    update();
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);

  return locale;
};
