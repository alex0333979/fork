import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CartFragmentDoc } from '../fragments/cart.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddOneClickInfoMutationVariables = Types.Exact<{
  input: Types.OneClickInfoInput;
}>;


export type AddOneClickInfoMutation = { __typename?: 'Mutation', AddOneClickInfo: { __typename?: 'CartResponse', message: string, status: boolean, data?: { __typename?: 'Cart', promoCode?: string | null, shippingType: Types.ShippingType, remarks?: string | null, expeditingService?: string | null, defaultCurrency?: { __typename?: 'Currency', label: Types.CurrencyType, code: Types.CurrencyCode, symbol: string } | null, billingAddress?: { __typename?: 'BillingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, shippingAddress?: { __typename?: 'ShippingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, items?: Array<{ __typename?: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: string | null, productCategory?: Types.ProductCategory | null, productSku?: Types.ProductSku | null, isComplete: boolean, createdAt?: any | null, updatedAt?: any | null }> | null } | null } };


export const AddOneClickInfoDocument = gql`
    mutation AddOneClickInfo($input: OneClickInfoInput!) {
  AddOneClickInfo(input: $input) {
    message
    status
    data {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export type AddOneClickInfoMutationFn = Apollo.MutationFunction<AddOneClickInfoMutation, AddOneClickInfoMutationVariables>;

/**
 * __useAddOneClickInfoMutation__
 *
 * To run a mutation, you first call `useAddOneClickInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOneClickInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOneClickInfoMutation, { data, loading, error }] = useAddOneClickInfoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddOneClickInfoMutation(baseOptions?: Apollo.MutationHookOptions<AddOneClickInfoMutation, AddOneClickInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOneClickInfoMutation, AddOneClickInfoMutationVariables>(AddOneClickInfoDocument, options);
      }
export type AddOneClickInfoMutationHookResult = ReturnType<typeof useAddOneClickInfoMutation>;
export type AddOneClickInfoMutationResult = Apollo.MutationResult<AddOneClickInfoMutation>;
export type AddOneClickInfoMutationOptions = Apollo.BaseMutationOptions<AddOneClickInfoMutation, AddOneClickInfoMutationVariables>;