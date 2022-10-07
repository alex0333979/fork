import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateEntryPhotoMutationVariables = Types.Exact<{
  imageUrl: Types.Scalars['String'];
  editToken: Types.Scalars['String'];
}>;


export type UpdateEntryPhotoMutation = { __typename?: 'Mutation', UpdateEntryPhoto: { __typename?: 'EntryResponse', message: string, status: boolean, data?: { __typename?: 'Entry', id: string } | null } };


export const UpdateEntryPhotoDocument = gql`
    mutation UpdateEntryPhoto($imageUrl: String!, $editToken: String!) {
  UpdateEntryPhoto(imageUrl: $imageUrl, editToken: $editToken) {
    message
    status
    data {
      id
    }
  }
}
    `;
export type UpdateEntryPhotoMutationFn = Apollo.MutationFunction<UpdateEntryPhotoMutation, UpdateEntryPhotoMutationVariables>;

/**
 * __useUpdateEntryPhotoMutation__
 *
 * To run a mutation, you first call `useUpdateEntryPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEntryPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEntryPhotoMutation, { data, loading, error }] = useUpdateEntryPhotoMutation({
 *   variables: {
 *      imageUrl: // value for 'imageUrl'
 *      editToken: // value for 'editToken'
 *   },
 * });
 */
export function useUpdateEntryPhotoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEntryPhotoMutation, UpdateEntryPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEntryPhotoMutation, UpdateEntryPhotoMutationVariables>(UpdateEntryPhotoDocument, options);
      }
export type UpdateEntryPhotoMutationHookResult = ReturnType<typeof useUpdateEntryPhotoMutation>;
export type UpdateEntryPhotoMutationResult = Apollo.MutationResult<UpdateEntryPhotoMutation>;
export type UpdateEntryPhotoMutationOptions = Apollo.BaseMutationOptions<UpdateEntryPhotoMutation, UpdateEntryPhotoMutationVariables>;