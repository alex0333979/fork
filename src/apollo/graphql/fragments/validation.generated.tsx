import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type ValidationFragment = { __typename?: 'Validation', message?: string | null, type: Types.ValidationType, value?: number | null };

export const ValidationFragmentDoc = gql`
    fragment Validation on Validation {
  message
  type
  value
}
    `;