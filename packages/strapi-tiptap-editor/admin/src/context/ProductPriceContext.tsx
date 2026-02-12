import React, { createContext, useContext, useState } from 'react';

import type { ProductPrice } from '../hooks/useProductPrices';

interface ProductPriceContextType {
  productPrice: ProductPrice | null;
  busy: boolean;
  setProductPrice: (data: ProductPrice | null) => void;
  setBusy: (state: boolean) => void;
}

const ProductPriceContext = createContext<ProductPriceContextType>({
  productPrice: null,
  busy: false,
  setProductPrice: () => {},
  setBusy: () => {},
});

export const useProductPriceContext = () => useContext(ProductPriceContext);

export const ProductPriceProvider = ({ children }: { children: React.ReactNode }) => {
  const [productPrice, setProductPrice] = useState<ProductPrice | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <ProductPriceContext.Provider
      value={{
        productPrice,
        busy,
        setProductPrice,
        setBusy,
      }}
    >
      {children}
    </ProductPriceContext.Provider>
  );
};
