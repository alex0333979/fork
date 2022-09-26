import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CartFragmentDoc } from '../fragments/cart.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddShippingAddressToCartMutationVariables = Types.Exact<{
  shippingAddress: Types.ShippingAddressInput;
}>;


export type AddShippingAddressToCartMutation = { __typename?: 'Mutation', AddShippingAddressToCart: { __typename?: 'CartResponse', message: string, status: boolean, data?: { __typename?: 'Cart', promoCode?: string | null, shippingType: Types.ShippingType, remarks?: string | null, defaultCurrency?: { __typename?: 'Currency', label: Types.CurrencyType, code: Types.CurrencyCode, symbol: string } | null, billingAddress?: { __typename?: 'BillingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, shippingAddress?: { __typename?: 'ShippingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, items?: Array<{ __typename?: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: string | null, productCategory?: Types.ProductCategory | null, productSku?: Types.ProductSku | null, isComplete: boolean, expeditingService?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null } | null } };


export const AddShippingAddressToCartDocument = gql`
    mutation AddShippingAddressToCart($shippingAddress: ShippingAddressInput!) {
  AddShippingAddressToCart(shippingAddress: $shippingAddress) {
    message
    status
    data {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export type AddShippingAddressToCartMutationFn = Apollo.MutationFunction<AddShippingAddressToCartMutation, AddShippingAddressToCartMutationVariables>;

/**
 * __useAddShippingAddressToCartMutation__
 *
 * To run a mutation, you first call `useAddShippingAddressToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddShippingAddressToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addShippingAddressToCartMutation, { data, loading, error }] = useAddShippingAddressToCartMutation({
 *   variables: {
 *      shippingAddress: // value for 'shippingAddress'
 *   },
 * });
 */
export function useAddShippingAddressToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddShippingAddressToCartMutation, AddShippingAddressToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddShippingAddressToCartMutation, AddShippingAddressToCartMutationVariables>(AddShippingAddressToCartDocument, options);
      }
export type AddShippingAddressToCartMutationHookResult = ReturnType<typeof useAddShippingAddressToCartMutation>;
export type AddShippingAddressToCartMutationResult = Apollo.MutationResult<AddShippingAddressToCartMutation>;
export type AddShippingAddressToCartMutationOptions = Apollo.BaseMutationOptions<AddShippingAddressToCartMutation, AddShippingAddressToCartMutationVariables>;