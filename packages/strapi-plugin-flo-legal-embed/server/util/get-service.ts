import type { Core } from '@strapi/strapi';

import { pluginId } from './plugin-id';

export const getService = (strapi: Core.Strapi, name: string) => {
  return strapi.plugin(pluginId).service(name);
};
