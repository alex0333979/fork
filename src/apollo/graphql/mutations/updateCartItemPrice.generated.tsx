import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CartFragmentDoc } from '../fragments/cart.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCartItemPriceMutationVariables = Types.Exact<{
  item: Types.UpdateCartItemPriceInput;
}>;


export type UpdateCartItemPriceMutation = { __typename?: 'Mutation', UpdateCartItemPrice: { __typename?: 'CartResponse', message: string, status: boolean, data?: { __typename?: 'Cart', promoCode?: string | null, shippingType: Types.ShippingType, remarks?: string | null, expeditingService?: string | null, coupon?: Types.CouponType | null, defaultCurrency?: { __typename?: 'Currency', label: Types.CurrencyType, code: Types.CurrencyCode, symbol: string } | null, billingAddress?: { __typename?: 'BillingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, shippingAddress?: { __typename?: 'ShippingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, items?: Array<{ __typename?: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: string | null, productCategory?: Types.ProductCategory | null, productSku?: Types.ProductSku | null, isComplete: boolean, createdAt?: any | null, updatedAt?: any | null }> | null } | null } };


export const UpdateCartItemPriceDocument = gql`
    mutation UpdateCartItemPrice($item: UpdateCartItemPriceInput!) {
  UpdateCartItemPrice(item: $item) {
    message
    status
    data {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export type UpdateCartItemPriceMutationFn = Apollo.MutationFunction<UpdateCartItemPriceMutation, UpdateCartItemPriceMutationVariables>;

/**
 * __useUpdateCartItemPriceMutation__
 *
 * To run a mutation, you first call `useUpdateCartItemPriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartItemPriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartItemPriceMutation, { data, loading, error }] = useUpdateCartItemPriceMutation({
 *   variables: {
 *      item: // value for 'item'
 *   },
 * });
 */
export function useUpdateCartItemPriceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartItemPriceMutation, UpdateCartItemPriceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCartItemPriceMutation, UpdateCartItemPriceMutationVariables>(UpdateCartItemPriceDocument, options);
      }
export type UpdateCartItemPriceMutationHookResult = ReturnType<typeof useUpdateCartItemPriceMutation>;
export type UpdateCartItemPriceMutationResult = Apollo.MutationResult<UpdateCartItemPriceMutation>;
export type UpdateCartItemPriceMutationOptions = Apollo.BaseMutationOptions<UpdateCartItemPriceMutation, UpdateCartItemPriceMutationVariables>;