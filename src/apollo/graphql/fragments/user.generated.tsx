import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { BillingAddressFragmentDoc } from './billingAddress.generated';
import { ShippingAddressFragmentDoc } from './shippingAddress.generated';
import { CartFragmentDoc } from './cart.generated';
export type UserFragment = { __typename?: 'User', id: string, email?: string | null, firstName?: string | null, lastName?: string | null, phone?: string | null, guest: boolean, role?: Types.UserRole | null, country?: string | null, createdAt: any, updatedAt: any, billingAddress?: { __typename?: 'BillingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, shippingAddress?: { __typename?: 'ShippingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, cart?: { __typename?: 'Cart', promoCode?: string | null, shippingType: Types.ShippingType, remarks?: string | null, expeditingService?: string | null, defaultCurrency?: { __typename?: 'Currency', label: Types.CurrencyType, code: Types.CurrencyCode, symbol: string } | null, billingAddress?: { __typename?: 'BillingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, shippingAddress?: { __typename?: 'ShippingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, items?: Array<{ __typename?: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: string | null, productCategory?: Types.ProductCategory | null, productSku?: Types.ProductSku | null, isComplete: boolean, createdAt?: any | null, updatedAt?: any | null }> | null } | null };

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
  firstName
  lastName
  phone
  guest
  role
  country
  createdAt
  updatedAt
  billingAddress {
    ...BillingAddress
  }
  shippingAddress {
    ...ShippingAddress
  }
  cart {
    ...Cart
  }
}
    ${BillingAddressFragmentDoc}
${ShippingAddressFragmentDoc}
${CartFragmentDoc}`;