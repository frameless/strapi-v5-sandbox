import type { Context } from 'koa';
import { Core } from '@strapi/strapi';

import { pluginId } from '../util/plugin-id';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async config(ctx: Context): Promise<void> {
    try {
      const config = await strapi.plugin(pluginId).service('plugin').getConfig();
      ctx.body = config;
    } catch (error) {
      strapi.log.error('Error fetching Preview button config:', error);
      ctx.badRequest('Something went wrong with the Preview button config');
    }
  },
});
