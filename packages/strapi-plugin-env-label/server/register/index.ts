import { PLUGIN_ID } from '../../admin/src/pluginId';

export default ({ strapi }: { strapi: any }) => {
  strapi.customFields.register({
    name: PLUGIN_ID,
    plugin: PLUGIN_ID,
    type: 'string',
  });
};
