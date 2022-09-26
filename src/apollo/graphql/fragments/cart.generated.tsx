import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CurrencyFragmentDoc } from './currency.generated';
import { BillingAddressFragmentDoc } from './billingAddress.generated';
import { ShippingAddressFragmentDoc } from './shippingAddress.generated';
import { CartItemFragmentDoc } from './cartItem.generated';
export type CartFragment = { __typename?: 'Cart', promoCode?: string | null, shippingType: Types.ShippingType, remarks?: string | null, defaultCurrency?: { __typename?: 'Currency', label: Types.CurrencyType, code: Types.CurrencyCode, symbol: string } | null, billingAddress?: { __typename?: 'BillingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, shippingAddress?: { __typename?: 'ShippingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, items?: Array<{ __typename?: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: string | null, productCategory?: Types.ProductCategory | null, productSku?: Types.ProductSku | null, isComplete: boolean, expeditingService?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null };

export const CartFragmentDoc = gql`
    fragment Cart on Cart {
  defaultCurrency {
    ...Currency
  }
  billingAddress {
    ...BillingAddress
  }
  shippingAddress {
    ...ShippingAddress
  }
  items {
    ...CartItem
  }
  promoCode
  shippingType
  remarks
}
    ${CurrencyFragmentDoc}
${BillingAddressFragmentDoc}
${ShippingAddressFragmentDoc}
${CartItemFragmentDoc}`;