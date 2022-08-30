import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CartFragmentDoc } from '../fragments/cart.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveItemsFromCartMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['ID']> | Types.Scalars['ID'];
}>;


export type RemoveItemsFromCartMutation = { __typename?: 'Mutation', RemoveItemsFromCart: { __typename?: 'CartResponse', message: string, status: boolean, data?: { __typename?: 'Cart', promoCode?: string | null, shippingType: Types.ShippingType, remarks?: string | null, defaultCurrency?: { __typename?: 'Currency', label: Types.CurrencyType, code: Types.CurrencyCode, symbol: string } | null, billingAddress?: { __typename?: 'BillingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, shippingAddress?: { __typename?: 'ShippingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, items?: Array<{ __typename?: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: string | null, productCategory?: Types.ProductCategory | null, productSku?: Types.ProductSku | null, isComplete: boolean, createdAt?: any | null, updatedAt?: any | null }> | null } | null } };


export const RemoveItemsFromCartDocument = gql`
    mutation RemoveItemsFromCart($ids: [ID!]!) {
  RemoveItemsFromCart(ids: $ids) {
    message
    status
    data {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export type RemoveItemsFromCartMutationFn = Apollo.MutationFunction<RemoveItemsFromCartMutation, RemoveItemsFromCartMutationVariables>;

/**
 * __useRemoveItemsFromCartMutation__
 *
 * To run a mutation, you first call `useRemoveItemsFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveItemsFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeItemsFromCartMutation, { data, loading, error }] = useRemoveItemsFromCartMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useRemoveItemsFromCartMutation(baseOptions?: Apollo.MutationHookOptions<RemoveItemsFromCartMutation, RemoveItemsFromCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveItemsFromCartMutation, RemoveItemsFromCartMutationVariables>(RemoveItemsFromCartDocument, options);
      }
export type RemoveItemsFromCartMutationHookResult = ReturnType<typeof useRemoveItemsFromCartMutation>;
export type RemoveItemsFromCartMutationResult = Apollo.MutationResult<RemoveItemsFromCartMutation>;
export type RemoveItemsFromCartMutationOptions = Apollo.BaseMutationOptions<RemoveItemsFromCartMutation, RemoveItemsFromCartMutationVariables>;