import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CartFragmentDoc } from '../fragments/cart.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddPromoCodeToCartMutationVariables = Types.Exact<{
  promoCode: Types.Scalars['String'];
}>;


export type AddPromoCodeToCartMutation = { __typename?: 'Mutation', AddPromoCodeToCart: { __typename?: 'CartResponse', message: string, status: boolean, data?: { __typename?: 'Cart', promoCode?: string | null, shippingType: Types.ShippingType, defaultCurrency?: { __typename?: 'Currency', label: Types.CurrencyType, code: Types.CurrencyCode, symbol: string } | null, billingAddress?: { __typename?: 'BillingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, shippingAddress?: { __typename?: 'ShippingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, items?: Array<{ __typename?: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: string | null, productCategory?: Types.ProductCategory | null, productSku?: Types.ProductSku | null, isComplete: boolean, createdAt?: any | null, updatedAt?: any | null }> | null } | null } };


export const AddPromoCodeToCartDocument = gql`
    mutation AddPromoCodeToCart($promoCode: String!) {
  AddPromoCodeToCart(promoCode: $promoCode) {
    message
    status
    data {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export type AddPromoCodeToCartMutationFn = Apollo.MutationFunction<AddPromoCodeToCartMutation, AddPromoCodeToCartMutationVariables>;

/**
 * __useAddPromoCodeToCartMutation__
 *
 * To run a mutation, you first call `useAddPromoCodeToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPromoCodeToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPromoCodeToCartMutation, { data, loading, error }] = useAddPromoCodeToCartMutation({
 *   variables: {
 *      promoCode: // value for 'promoCode'
 *   },
 * });
 */
export function useAddPromoCodeToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddPromoCodeToCartMutation, AddPromoCodeToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPromoCodeToCartMutation, AddPromoCodeToCartMutationVariables>(AddPromoCodeToCartDocument, options);
      }
export type AddPromoCodeToCartMutationHookResult = ReturnType<typeof useAddPromoCodeToCartMutation>;
export type AddPromoCodeToCartMutationResult = Apollo.MutationResult<AddPromoCodeToCartMutation>;
export type AddPromoCodeToCartMutationOptions = Apollo.BaseMutationOptions<AddPromoCodeToCartMutation, AddPromoCodeToCartMutationVariables>;