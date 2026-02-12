// List of language codes that are written right-to-left
const rtlLanguages = [
  'ar',
  'he',
  'fa',
  'ur',
  'yi',
  'dv',
  'ps',
  'ku',
  'ug',
  'arc',
  'azb',
  'mzn',
  'pnb',
  'sd',
  'ckb',
  'lrc',
  'glk',
  'nv',
  'prs',
  'tmr',
  'uga',
];
export const getDirectionFromLanguageCode = (languageCode: string): 'ltr' | 'rtl' => {
  try {
    // Check if the language code is valid and in the list of RTL languages
    if (languageCode && rtlLanguages.includes(languageCode.toLowerCase())) {
      return 'rtl';
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error processing language code:', err);
  }

  // Default to left-to-right if not in the list of RTL languages or on error
  return 'ltr';
};
