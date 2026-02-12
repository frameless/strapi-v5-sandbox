import i18nLanguages from '@cospired/i18n-iso-languages';
import enI18Json from '@cospired/i18n-iso-languages/langs/en.json';
import nlI18Json from '@cospired/i18n-iso-languages/langs/nl.json';

i18nLanguages.registerLocale(enI18Json);
i18nLanguages.registerLocale(nlI18Json);

export default {
  headings: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  bold: true,
  italic: true,
  strikethrough: true,
  underline: true,
  code: false,
  blockquote: true,
  highlight: false,
  align: ['left', 'center', 'right'],
  lists: ['ol', 'ul'],
  disableOrderedListShorthand: false,
  columns: ['two', 'three'],
  table: true,
  hardbreak: true,
  horizontal: true,
  links: {
    enabled: true,
    autolink: false,
    openOnClick: false,
    linkOnPaste: true,
    relAttribute: false,
    HTMLAttributes: {
      rel: '',
    },
  },
  image: {
    enabled: true,
    inline: true,
    allowBase64: false,
  },
  other: {
    wordcount: false,
    language: {
      enabled: true,
      default: [
        {
          name: i18nLanguages.getName('NL', 'nl'),
          code: 'nl',
        },
        {
          name: i18nLanguages.getName('EN', 'nl'),
          code: 'en',
        },
        {
          name: i18nLanguages.getName('AR', 'nl'),
          code: 'ar',
        },
        {
          name: i18nLanguages.getName('UK', 'nl'),
          code: 'uk',
        },
        {
          name: i18nLanguages.getName('TR', 'nl'),
          code: 'tr',
        },
      ],
    },
    saveJson: false,
  },
  youtube: {
    enabled: true,
    height: 480,
    width: 640,
  },
};
