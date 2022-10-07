import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type PDocumentFragment = { __typename?: 'PDocument', id?: number | null, country?: string | null, type?: string | null, countryCode?: string | null, background?: string | null, dpi?: number | null, dimensions?: { __typename?: 'Dimensions', height?: number | null, unit?: string | null, width?: number | null } | null, size?: { __typename?: 'Size', max?: number | null, min?: number | null } | null, head?: { __typename?: 'Head', Dimensions?: { __typename?: 'Dimensions', height?: number | null, unit?: string | null, width?: number | null } | null, position?: { __typename?: 'Position', max?: number | null, min?: number | null, unit?: Types.Unit | null } | null } | null };

export const PDocumentFragmentDoc = gql`
    fragment PDocument on PDocument {
  id
  country
  type
  countryCode
  background
  dpi
  dimensions {
    height
    unit
    width
  }
  size {
    max
    min
  }
  head {
    Dimensions {
      height
      unit
      width
    }
    position {
      max
      min
      unit
    }
  }
}
    `;