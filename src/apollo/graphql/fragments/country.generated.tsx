import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type CountryFragment = { __typename?: 'Country', id?: number | null, country?: string | null, type?: string | null, countryCode?: string | null };

export const CountryFragmentDoc = gql`
    fragment Country on Country {
  id
  country
  type
  countryCode
}
    `;