import type { Core } from '@strapi/strapi';
import type { Context } from 'koa';

import { PLUGIN_ID } from '../../admin/src/pluginId';
import { getService } from '../util';

export default {
  async config(ctx: Context) {
    const strapi = ctx.state.strapi as Core.Strapi;

    try {
      const config = await getService(strapi, 'plugin').getConfig();

      if (!config?.api_url || !config?.token) {
        ctx.body = { config };
        return;
      }

      const response = await fetch(`${config.api_url}/block-publications?type=CHECK`, {
        headers: {
          'x-api-key': config.token,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const checks = await response.json();
      ctx.body = { config, checks };
    } catch (error: any) {
      console.error(error);
      ctx.badRequest(`Failed to load ${PLUGIN_ID} config: ${error.message}`);
    }
  },
};
