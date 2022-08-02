import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type OptionFragment = { __typename?: 'Option', notes?: string | null, text?: string | null, value: any };

export const OptionFragmentDoc = gql`
    fragment Option on Option {
  notes
  text
  value
}
    `;