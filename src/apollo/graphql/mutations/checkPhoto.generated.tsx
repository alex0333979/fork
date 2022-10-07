import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { TestResultFragmentDoc } from '../fragments/testResult.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckPhotoMutationVariables = Types.Exact<{
  userAgent: Types.Scalars['String'];
  imageResolution: Types.Scalars['String'];
  entryId: Types.Scalars['String'];
}>;


export type CheckPhotoMutation = { __typename?: 'Mutation', CheckPhoto: { __typename?: 'CheckPhotoResponse', message: string, status: boolean, data?: { __typename?: 'TestResult', message?: string | null, code?: Types.Code | null, failed?: Array<{ __typename?: 'Dictionary', test?: string | null, message?: string | null }> | null, passed?: Array<{ __typename?: 'Dictionary', test?: string | null, message?: string | null }> | null } | null } };


export const CheckPhotoDocument = gql`
    mutation CheckPhoto($userAgent: String!, $imageResolution: String!, $entryId: String!) {
  CheckPhoto(
    userAgent: $userAgent
    imageResolution: $imageResolution
    entryId: $entryId
  ) {
    message
    status
    data {
      ...TestResult
    }
  }
}
    ${TestResultFragmentDoc}`;
export type CheckPhotoMutationFn = Apollo.MutationFunction<CheckPhotoMutation, CheckPhotoMutationVariables>;

/**
 * __useCheckPhotoMutation__
 *
 * To run a mutation, you first call `useCheckPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkPhotoMutation, { data, loading, error }] = useCheckPhotoMutation({
 *   variables: {
 *      userAgent: // value for 'userAgent'
 *      imageResolution: // value for 'imageResolution'
 *      entryId: // value for 'entryId'
 *   },
 * });
 */
export function useCheckPhotoMutation(baseOptions?: Apollo.MutationHookOptions<CheckPhotoMutation, CheckPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckPhotoMutation, CheckPhotoMutationVariables>(CheckPhotoDocument, options);
      }
export type CheckPhotoMutationHookResult = ReturnType<typeof useCheckPhotoMutation>;
export type CheckPhotoMutationResult = Apollo.MutationResult<CheckPhotoMutation>;
export type CheckPhotoMutationOptions = Apollo.BaseMutationOptions<CheckPhotoMutation, CheckPhotoMutationVariables>;