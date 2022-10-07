import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type SignedUrlFragment = { __typename?: 'SignedUrl', url: string, signedUrl: string };

export const SignedUrlFragmentDoc = gql`
    fragment SignedUrl on SignedUrl {
  url
  signedUrl
}
    `;