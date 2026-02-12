import { Box } from '@strapi/design-system';
import styled from 'styled-components';

export const TableControlsGrid = styled(Box)`
  && {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spaces[2]};
  }
`;
