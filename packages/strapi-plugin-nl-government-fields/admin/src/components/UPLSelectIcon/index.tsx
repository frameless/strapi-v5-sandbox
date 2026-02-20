import { Flex } from '@strapi/design-system';
import { User } from '@strapi/icons';

export const UPLSelectIcon = () => (
  <Flex justifyContent="center" alignItems="center" width={7} height={6} hasRadius aria-hidden>
    <User fill="primary600" />
  </Flex>
);
