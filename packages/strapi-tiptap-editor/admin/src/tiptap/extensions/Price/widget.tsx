import { NodeViewWrapper } from '@tiptap/react';
import type { NodeViewWrapperProps, ReactNodeViewProps } from '@tiptap/react';
import type { PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import { useProductPriceContext } from '../../../context/ProductPriceContext';
import { formatCurrency, getTranslation, isFreeProduct } from '../../../utils';

const StyledPriceWidgetWrapper = styled(NodeViewWrapper)`
  display: inline-block;
  border: 1px dashed ${({ theme }) => theme.colors.neutral400};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spaces[1]};
  background-color: ${({ theme }) => theme.colors.primary100};
  margin-inline: ${({ theme }) => theme.spaces[1]};
  user-select: none;
  &:hover {
    border-color: ${({ theme }) => theme.colors.neutral1000};
  }
`;

const PriceWidgetWrapper = ({ children }: PropsWithChildren<NodeViewWrapperProps>) => (
  <StyledPriceWidgetWrapper contentEditable={false}>{children}</StyledPriceWidgetWrapper>
);

const PriceWidget = ({ node }: ReactNodeViewProps<HTMLElement>) => {
  const { formatMessage } = useIntl();
  const { productPrice, busy } = useProductPriceContext();
  const price =
    productPrice?.price && productPrice.price.find((price) => price?.uuid === node.attrs['data-strapi-idref']);

  if (busy) return null;
  if (!price)
    return (
      <PriceWidgetWrapper>
        {formatMessage({
          id: getTranslation('components.priceWidget.priceUnknown'),
          defaultMessage: '€\u00A0#,##0\u00A0(price\u00A0unknown)',
        })}
      </PriceWidgetWrapper>
    );
  return (
    <PriceWidgetWrapper>
      {isFreeProduct(price.value)
        ? formatMessage({ id: getTranslation('common.words.freeProduct'), defaultMessage: 'free' })
        : formatCurrency(price)}
    </PriceWidgetWrapper>
  );
};
export default PriceWidget;
