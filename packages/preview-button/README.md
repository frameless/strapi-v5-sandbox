# Strapi Plugin Preview-Button

## Integrate the Plugin into Strapi Dashboard

Create or update the `./config/plugins.ts` or `.js` file:

### **TypeScript:**

```ts
export default ({ env }) => ({
  "preview-button": {
    enabled: true,
    config: {
      domain: env("FRONTEND_PUBLIC_URL"),
      preview_secret_token: env("PREVIEW_SECRET_TOKEN"),
      api_token: env("PREVIEW_API_TOKEN"),
      contentTypes: [
        {
          uid: "api::homepage.homepage",
          query: {
            type: "Homepage",
          },
        },
        {
          uid: "api::product.product",
          query: {
            type: "products",
          },
        },
        {
          uid: "api::vac.vac",
          query: {
            type: "vac",
          },
        },
      ],
    },
  },
});
```

**Javascript**:

```js
module.exports = ({ env }) => ({
  "preview-button": {
    enabled: true,
    config: {
      domain: env("FRONTEND_PUBLIC_URL"),
      preview_secret_token: env("PREVIEW_SECRET_TOKEN"),
      api_token: env("PREVIEW_API_TOKEN"),
      contentTypes: [
        {
          uid: "api::homepage.homepage",
          query: {
            type: "Homepage",
          },
        },
        {
          uid: "api::product.product",
          query: {
            type: "products",
          },
        },
        {
          uid: "api::vac.vac",
          query: {
            type: "vac",
          },
        },
      ],
    },
  },
});
```

After the plugin integration, you have to build the Strapi dashboard by using `strapi build && strapi develop`

#### Preview a Content Type by Navigating to the Preview Page

**Example**:

```ts
module.exports = ({ env }) => ({
  "preview-button": {
    enabled: true,
    config: {
      domain: env("FRONTEND_PUBLIC_URL"),
      token: env("PREVIEW_SECRET_TOKEN"),
      contentTypes: [
        {
          uid: "api::product.product",
          query: {
            type: "products",
          },
        },
      ],
    },
  },
});
```

## The preview button configuration

| Property             | Type                                 | Description                                 | Required |
| -------------------- | ------------------------------------ | ------------------------------------------- | -------- |
| enabled              | boolean                              | Enable or disable the preview button        | Yes      |
| config.contentTypes  | array                                | List of content types                       | Yes      |
| domain               | string (env("FRONTEND_PUBLIC_URL"))  | URL of the frontend application             | Yes      |
| preview_secret_token | string (env("PREVIEW_SECRET_TOKEN")) | Secret token for preview authentication     | Yes      |
| api_token            | string (env("PREVIEW_API_TOKEN"))    | API token for secure access (optional)      | No       |
| uid                  | string                               | Unique identifier (UID) of the content type | Yes      |
| query.type           | string                               | Type parameter for the preview URL          | Yes      |
