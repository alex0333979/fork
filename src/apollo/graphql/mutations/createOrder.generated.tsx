import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { OrderFragmentDoc } from '../fragments/order.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateOrderMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateOrderMutation = { __typename?: 'Mutation', CreateOrder: { __typename?: 'OrderResponse', message: string, status: boolean, data?: { __typename?: 'Order', id: string, paymentStatus: Types.PaymentStatus, userId: string, totalPrice: number, promoCode?: string | null, orderNumber: number, shippingType: Types.ShippingType, trackingNumber?: string | null, fulfillmentFires: number, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'OrderItem', id: string, productId: string, name: string, description: string, imageUrl?: string | null, productCategory?: Types.ProductCategory | null, productSku?: Types.ProductSku | null, isComplete: boolean, createdAt?: any | null, updatedAt?: any | null }>, billingAddress: { __typename?: 'BillingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string }, shippingAddress?: { __typename?: 'ShippingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, status: { __typename?: 'OrderTrack', confirmOrder: { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any }, productPrepared: { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any }, shipped: { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any }, outForDelivery: { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any }, delivered: { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any } } } | null } };


export const CreateOrderDocument = gql`
    mutation CreateOrder {
  CreateOrder {
    message
    status
    data {
      ...Order
    }
  }
}
    ${OrderFragmentDoc}`;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;