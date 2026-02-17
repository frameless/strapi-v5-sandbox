export type Config = {
  api_url: string;
  token: string;
};

export default {
  default: {},
  // export default {
  //   default: {},
  //   validator: (config: Config) => {
  //     if (!config) {
  //       return;
  //     }
  //     if (!config?.api_url) {
  //       console.warn('strapi-plugin-flo-legal-embed: Warning: Missing api_url prop.');
  //     }
  //     if (!config?.token) {
  //       console.warn('strapi-plugin-flo-legal-embed: Warning: Missing token prop.');
  //     }
  //   },
  // };
};
