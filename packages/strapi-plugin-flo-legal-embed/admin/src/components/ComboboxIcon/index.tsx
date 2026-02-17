import { Flex } from '@strapi/design-system';
import { ManyWays } from '@strapi/icons';

const ComboboxIcon = () => (
  <Flex
    justifyContent="center"
    alignItems="center"
    width={7}
    height={6}
    background="primary100"
    borderColor="primary200"
    borderWidth="1px"
    borderStyle="solid"
    hasRadius
    aria-hidden
  >
    <ManyWays color="primary600" />
  </Flex>
);

export default ComboboxIcon;
