import { gql } from '@apollo/client';
export type BillingAddressFragment = { __typename?: 'BillingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string };

export const BillingAddressFragmentDoc = gql`
    fragment BillingAddress on BillingAddress {
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