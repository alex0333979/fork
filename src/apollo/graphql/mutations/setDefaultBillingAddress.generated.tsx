import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { BillingAddressFragmentDoc } from '../fragments/billingAddress.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetDefaultBillingAddressMutationVariables = Types.Exact<{
  billingAddress: Types.BillingAddressInput;
}>;


export type SetDefaultBillingAddressMutation = { __typename?: 'Mutation', SetDefaultBillingAddress: { __typename?: 'BillingAddressResponse', message: string, status: boolean, data?: { __typename?: 'BillingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null } };


export const SetDefaultBillingAddressDocument = gql`
    mutation SetDefaultBillingAddress($billingAddress: BillingAddressInput!) {
  SetDefaultBillingAddress(billingAddress: $billingAddress) {
    message
    status
    data {
      ...BillingAddress
    }
  }
}
    ${BillingAddressFragmentDoc}`;
export type SetDefaultBillingAddressMutationFn = Apollo.MutationFunction<SetDefaultBillingAddressMutation, SetDefaultBillingAddressMutationVariables>;

/**
 * __useSetDefaultBillingAddressMutation__
 *
 * To run a mutation, you first call `useSetDefaultBillingAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDefaultBillingAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDefaultBillingAddressMutation, { data, loading, error }] = useSetDefaultBillingAddressMutation({
 *   variables: {
 *      billingAddress: // value for 'billingAddress'
 *   },
 * });
 */
export function useSetDefaultBillingAddressMutation(baseOptions?: Apollo.MutationHookOptions<SetDefaultBillingAddressMutation, SetDefaultBillingAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetDefaultBillingAddressMutation, SetDefaultBillingAddressMutationVariables>(SetDefaultBillingAddressDocument, options);
      }
export type SetDefaultBillingAddressMutationHookResult = ReturnType<typeof useSetDefaultBillingAddressMutation>;
export type SetDefaultBillingAddressMutationResult = Apollo.MutationResult<SetDefaultBillingAddressMutation>;
export type SetDefaultBillingAddressMutationOptions = Apollo.BaseMutationOptions<SetDefaultBillingAddressMutation, SetDefaultBillingAddressMutationVariables>;