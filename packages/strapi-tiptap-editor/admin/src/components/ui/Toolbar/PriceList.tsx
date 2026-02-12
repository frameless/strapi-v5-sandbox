import { SingleSelectOption, SingleSelect } from '@strapi/design-system';
import { useIntl } from 'react-intl';

import { PriceListTypes, PriceTypes } from '../../../types';
import { formatCurrency, getTranslation, isFreeProduct } from '../../../utils';
interface PriceListProps {
  productPrice: PriceListTypes;
  onPriceChange: (selectedPrice: PriceTypes) => void;
  value: string;
  disabled?: boolean;
}

export const PriceList = ({ productPrice, onPriceChange, value, disabled }: PriceListProps) => {
  const { formatMessage } = useIntl();
  if (productPrice && productPrice.price && productPrice.price.length === 0) {
    return null;
  }

  const handlePriceChange = (id: string | number) => {
    const selectedPrice = productPrice.price?.find((price) => price?.uuid === id);
    if (selectedPrice) {
      onPriceChange(selectedPrice);
    }
  };
  const isPriceHasUUID = productPrice?.price?.every((price) => price?.uuid);

  return (
    <SingleSelect
      disabled={disabled}
      size="S"
      value={value}
      placeholder={formatMessage({ id: getTranslation('components.priceList.placeholder') })}
      onChange={handlePriceChange}
    >
      {productPrice?.title && isPriceHasUUID && (
        <SingleSelectOption value={productPrice?.title}>{productPrice?.title}</SingleSelectOption>
      )}
      {!isPriceHasUUID && (
        <SingleSelectOption className="icon" value={getTranslation('components.priceList.option.errorMessage')}>
          {formatMessage({
            id: getTranslation('components.priceList.option.errorMessage'),
            defaultMessage: 'Please save the price collection to display the prices.',
          })}
        </SingleSelectOption>
      )}
      {productPrice?.price?.map(
        (price) =>
          price?.uuid && (
            <SingleSelectOption key={price.uuid} className="icon" value={price.uuid}>
              {formatMessage(
                { id: getTranslation('components.priceList.option') },
                {
                  label: price.label,
                  value: isFreeProduct(price.value)
                    ? formatMessage({ id: getTranslation('common.words.freeProduct'), defaultMessage: 'free' })
                    : formatCurrency(price),
                },
              )}
            </SingleSelectOption>
          ),
      )}
    </SingleSelect>
  );
};
