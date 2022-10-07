import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CurrencyFragmentDoc } from './currency.generated';
export type ProductFragment = { __typename?: 'Product', sku: Types.ProductSku, price: number, category: Types.ProductCategory, description?: string | null, currency: { __typename?: 'Currency', label: Types.CurrencyType, code: Types.CurrencyCode, symbol: string } };

export const ProductFragmentDoc = gql`
    fragment Product on Product {
  sku
  price
  currency {
    ...Currency
  }
  category
  description
}
    ${CurrencyFragmentDoc}`;