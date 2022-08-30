import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type ShippingAddressFragment = { __typename?: 'ShippingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string };

export const ShippingAddressFragmentDoc = gql`
    fragment ShippingAddress on ShippingAddress {
  address1
  address2
  city
  country
  firstName
  lastName
  postalCode
  state
  email
  phone
}
    `;