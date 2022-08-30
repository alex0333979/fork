import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type CurrencyFragment = { __typename?: 'Currency', label: Types.CurrencyType, code: Types.CurrencyCode, symbol: string };

export const CurrencyFragmentDoc = gql`
    fragment Currency on Currency {
  label
  code
  symbol
}
    `;