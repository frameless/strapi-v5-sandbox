import { Box } from '@strapi/design-system';
import styled from 'styled-components';

export const TableActionFooter = styled(Box)`
  padding-block-start: ${({ theme }) => theme.spaces[2]};
  margin-block-top: ${({ theme }) => theme.spaces[2]};
  border-block-start-style: solid;
  border-block-start-width: 1px;
  border-block-start-color: ${({ theme }) => theme.colors.neutral200};
`;
