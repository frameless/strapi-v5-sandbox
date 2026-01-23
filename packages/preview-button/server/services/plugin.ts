import type { Core } from '@strapi/strapi';

import config from '../config';
import { pluginId } from '../util';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async getConfig() {
    const data = await strapi.config.get(`plugin::${pluginId}`, config.default);
    return data;
  },
});
