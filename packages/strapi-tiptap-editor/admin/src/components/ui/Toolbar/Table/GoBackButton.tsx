import { Button } from '@strapi/design-system';
import styled from 'styled-components';

export const GoBackButton = styled(Button)`
  padding-block: ${({ theme }) => theme.spaces[1]};
  padding-inline: ${({ theme }) => theme.spaces[1]};
  margin-inline-end: ${({ theme }) => theme.spaces[2]};
`;
