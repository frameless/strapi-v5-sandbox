const CONTENT_TYPE_MAP: Record<string, { path: string; slugField: string }> = {
  'api::article.article': {
    path: 'article',
    slugField: 'slug',
  },
  'api::product.product': {
    path: 'products',
    slugField: 'slug',
  },
};

export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [process.env.FRONTEND_PUBLIC_URL],

      async handler(uid, { documentId, locale, status }) {
        const config = CONTENT_TYPE_MAP[uid];
        if (!config || !documentId) return null;

        const document = await strapi.documents(uid).findOne({
          documentId,
          fields: [config.slugField],
        });

        if (!document?.[config.slugField]) return null;

        const params = new URLSearchParams({
          secret: process.env.PREVIEW_SECRET_TOKEN!,
          slug: document[config.slugField],
          type: config.path,
          locale,
          status,
        });

        return `${process.env.FRONTEND_PUBLIC_URL}/api/preview?${params}`;
      },
    },
  },
});
