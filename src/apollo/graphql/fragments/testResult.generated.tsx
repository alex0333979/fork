import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type TestResultFragment = { __typename?: 'TestResult', message?: string | null, code?: Types.Code | null, failed?: Array<{ __typename?: 'Dictionary', test?: string | null, message?: string | null }> | null, passed?: Array<{ __typename?: 'Dictionary', test?: string | null, message?: string | null }> | null };

export const TestResultFragmentDoc = gql`
    fragment TestResult on TestResult {
  message
  code
  failed {
    test
    message
  }
  passed {
    test
    message
  }
}
    `;