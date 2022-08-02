import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPaymentIntentMutationVariables = Types.Exact<{
  orderId: Types.Scalars['String'];
  currency: Types.Scalars['String'];
}>;


export type GetPaymentIntentMutation = { __typename?: 'Mutation', GetPaymentIntent: { __typename?: 'PaymentIntentResponse', message: string, status: boolean, data?: { __typename?: 'PaymentIntent', clientSecret: string } | null } };


export const GetPaymentIntentDocument = gql`
    mutation GetPaymentIntent($orderId: String!, $currency: String!) {
  GetPaymentIntent(orderId: $orderId, currency: $currency) {
    message
    status
    data {
      clientSecret
    }
  }
}
    `;
export type GetPaymentIntentMutationFn = Apollo.MutationFunction<GetPaymentIntentMutation, GetPaymentIntentMutationVariables>;

/**
 * __useGetPaymentIntentMutation__
 *
 * To run a mutation, you first call `useGetPaymentIntentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentIntentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getPaymentIntentMutation, { data, loading, error }] = useGetPaymentIntentMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useGetPaymentIntentMutation(baseOptions?: Apollo.MutationHookOptions<GetPaymentIntentMutation, GetPaymentIntentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetPaymentIntentMutation, GetPaymentIntentMutationVariables>(GetPaymentIntentDocument, options);
      }
export type GetPaymentIntentMutationHookResult = ReturnType<typeof useGetPaymentIntentMutation>;
export type GetPaymentIntentMutationResult = Apollo.MutationResult<GetPaymentIntentMutation>;
export type GetPaymentIntentMutationOptions = Apollo.BaseMutationOptions<GetPaymentIntentMutation, GetPaymentIntentMutationVariables>;