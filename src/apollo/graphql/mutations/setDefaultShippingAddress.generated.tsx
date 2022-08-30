import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ShippingAddressFragmentDoc } from '../fragments/shippingAddress.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetDefaultShippingAddressMutationVariables = Types.Exact<{
  shippingAddress: Types.ShippingAddressInput;
}>;


export type SetDefaultShippingAddressMutation = { __typename?: 'Mutation', SetDefaultShippingAddress: { __typename?: 'ShippingAddressResponse', message: string, status: boolean, data?: { __typename?: 'ShippingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null } };


export const SetDefaultShippingAddressDocument = gql`
    mutation SetDefaultShippingAddress($shippingAddress: ShippingAddressInput!) {
  SetDefaultShippingAddress(shippingAddress: $shippingAddress) {
    message
    status
    data {
      ...ShippingAddress
    }
  }
}
    ${ShippingAddressFragmentDoc}`;
export type SetDefaultShippingAddressMutationFn = Apollo.MutationFunction<SetDefaultShippingAddressMutation, SetDefaultShippingAddressMutationVariables>;

/**
 * __useSetDefaultShippingAddressMutation__
 *
 * To run a mutation, you first call `useSetDefaultShippingAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDefaultShippingAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDefaultShippingAddressMutation, { data, loading, error }] = useSetDefaultShippingAddressMutation({
 *   variables: {
 *      shippingAddress: // value for 'shippingAddress'
 *   },
 * });
 */
export function useSetDefaultShippingAddressMutation(baseOptions?: Apollo.MutationHookOptions<SetDefaultShippingAddressMutation, SetDefaultShippingAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetDefaultShippingAddressMutation, SetDefaultShippingAddressMutationVariables>(SetDefaultShippingAddressDocument, options);
      }
export type SetDefaultShippingAddressMutationHookResult = ReturnType<typeof useSetDefaultShippingAddressMutation>;
export type SetDefaultShippingAddressMutationResult = Apollo.MutationResult<SetDefaultShippingAddressMutation>;
export type SetDefaultShippingAddressMutationOptions = Apollo.BaseMutationOptions<SetDefaultShippingAddressMutation, SetDefaultShippingAddressMutationVariables>;