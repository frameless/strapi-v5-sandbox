import 'styled-components';
import { type StrapiTheme } from '@strapi/design-system';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends StrapiTheme {}
}
