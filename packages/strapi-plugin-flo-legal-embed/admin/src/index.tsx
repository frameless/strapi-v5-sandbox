import type { StrapiApp } from '@strapi/strapi/admin';

import { FloLegalIcon } from './components/FloLegalIcon';
import { PLUGIN_ID } from './pluginId';
import reducers from './reducers';
import { getTranslation } from './utils/getTranslation';

type TranslateOptions = Record<string, string>;

const prefixPluginTranslations = (translate: TranslateOptions, pluginId: string): TranslateOptions => {
  if (!pluginId) {
    throw new TypeError("pluginId can't be empty");
  }
  return Object.keys(translate).reduce((acc, current) => {
    acc[`${pluginId}.${current}`] = translate[current];
    return acc;
  }, {} as TranslateOptions);
};

export default {
  register(app: StrapiApp) {
    app.addReducers(reducers);
    app.customFields.register({
      name: PLUGIN_ID,
      pluginId: PLUGIN_ID,
      type: 'string',
      icon: FloLegalIcon,
      intlLabel: {
        id: getTranslation('flo-legal-embed.label'),
        defaultMessage: 'Choose an Embedded Flo Legal Form',
      },
      intlDescription: {
        id: getTranslation('flo-legal-embed.description'),
        defaultMessage: 'Saves the unique identifier of the selected decision tree in the database.',
      },
      components: {
        Input: async () => {
          const { FloLegalCombobox } = await import('./components/FloLegalCombobox');

          return { default: FloLegalCombobox as React.ComponentType };
        },
      },
      options: {
        advanced: [
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: 'form.attribute.item.requiredField',
                  defaultMessage: 'Required field',
                },
                description: {
                  id: 'form.attribute.item.requiredField.description',
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    });
  },
  async registerTrads({ locales }: { locales: string[] }) {
    const importedTranslations = await Promise.all(
      locales.map((locale: any) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, PLUGIN_ID),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      }),
    );

    return Promise.resolve(importedTranslations);
  },
};
