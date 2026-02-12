import { Button } from '@strapi/design-system';
import styled from 'styled-components';

interface TableActionButtonProps {
  focusedIndex?: number;
  index?: number;
  flexDirection?: 'column' | 'row';
  justifyContent?: 'center' | 'start';
}

export const TableActionButton = styled(Button)<TableActionButtonProps>`
  min-height: ${({ flexDirection }) => (flexDirection === 'column' ? '80px' : '0')};
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: center;
  width: 100%;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;
  color: ${({ theme }) => theme.colors.neutral800};
  display: flex;
  outline: ${({ focusedIndex, index, theme }) =>
    focusedIndex === index ? `2px solid ${theme.colors.primary500}` : 'none'};
  background-color: ${({ focusedIndex, index, theme }) =>
    focusedIndex === index ? theme.colors.primary100 : theme.colors.neutral100};
  &:hover {
    color: ${({ theme }) => theme.colors.neutral0};
  }
`;
