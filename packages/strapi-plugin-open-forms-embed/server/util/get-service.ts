import { pluginId } from './plugin-id';

 
export const getService = (name: string) => strapi.plugin(pluginId).service(name);
