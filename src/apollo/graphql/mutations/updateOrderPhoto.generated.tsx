import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOrderPhotoMutationVariables = Types.Exact<{
  imageUrl: Types.Scalars['String'];
  editToken: Types.Scalars['String'];
}>;


export type UpdateOrderPhotoMutation = { __typename?: 'Mutation', UpdateOrderPhoto: { __typename?: 'StringResponse', message: string, status: boolean } };


export const UpdateOrderPhotoDocument = gql`
    mutation UpdateOrderPhoto($imageUrl: String!, $editToken: String!) {
  UpdateOrderPhoto(imageUrl: $imageUrl, editToken: $editToken) {
    message
    status
  }
}
    `;
export type UpdateOrderPhotoMutationFn = Apollo.MutationFunction<UpdateOrderPhotoMutation, UpdateOrderPhotoMutationVariables>;

/**
 * __useUpdateOrderPhotoMutation__
 *
 * To run a mutation, you first call `useUpdateOrderPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderPhotoMutation, { data, loading, error }] = useUpdateOrderPhotoMutation({
 *   variables: {
 *      imageUrl: // value for 'imageUrl'
 *      editToken: // value for 'editToken'
 *   },
 * });
 */
export function useUpdateOrderPhotoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderPhotoMutation, UpdateOrderPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderPhotoMutation, UpdateOrderPhotoMutationVariables>(UpdateOrderPhotoDocument, options);
      }
export type UpdateOrderPhotoMutationHookResult = ReturnType<typeof useUpdateOrderPhotoMutation>;
export type UpdateOrderPhotoMutationResult = Apollo.MutationResult<UpdateOrderPhotoMutation>;
export type UpdateOrderPhotoMutationOptions = Apollo.BaseMutationOptions<UpdateOrderPhotoMutation, UpdateOrderPhotoMutationVariables>;