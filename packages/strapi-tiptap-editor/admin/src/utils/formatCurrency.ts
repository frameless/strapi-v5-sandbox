import { PriceTypes } from '../types';

type ProductPriceType = Pick<PriceTypes, 'currency' | 'value'>;

export function formatCurrency(product: ProductPriceType, locale = 'nl') {
  try {
    if (!product || !product.currency || product.value === null) {
      return '€0.00'; // Default fallback
    }

    const currency = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: product.currency,
    }).format(product.value);

    return currency;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error formatting currency:', err);
    return `${product?.value || 0} ${product?.currency || 'EUR'}`; // Fallback format
  }
}
