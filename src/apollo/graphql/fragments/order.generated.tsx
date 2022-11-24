import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { OrderItemFragmentDoc } from './orderItem.generated';
import { BillingAddressFragmentDoc } from './billingAddress.generated';
import { ShippingAddressFragmentDoc } from './shippingAddress.generated';
import { OrderTrackFragmentDoc } from './orderTrack.generated';
export type OrderFragment = { __typename?: 'Order', id: string, paymentStatus: Types.PaymentStatus, userId: string, totalPrice: number, promoCode?: string | null, orderNumber: number, shippingType: Types.ShippingType, trackingNumber?: string | null, fulfillmentFires: number, coupon?: Types.CouponType | null, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'OrderItem', id: string, productId: string, name: string, description: string, imageUrl?: string | null, productCategory?: Types.ProductCategory | null, productSku?: Types.ProductSku | null, isComplete: boolean, createdAt?: any | null, updatedAt?: any | null }>, billingAddress: { __typename?: 'BillingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string }, shippingAddress?: { __typename?: 'ShippingAddress', address1: string, address2?: string | null, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: string | null, email: string, phone: string } | null, status: { __typename?: 'OrderTrack', confirmOrder: { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any }, productPrepared: { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any }, shipped: { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any }, outForDelivery: { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any }, delivered: { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any } } };

export const OrderFragmentDoc = gql`
    fragment Order on Order {
  id
  items {
    ...OrderItem
  }
  billingAddress {
    ...BillingAddress
  }
  shippingAddress {
    ...ShippingAddress
  }
  status {
    ...OrderTrack
  }
  paymentStatus
  userId
  totalPrice
  promoCode
  orderNumber
  shippingType
  trackingNumber
  fulfillmentFires
  coupon
  createdAt
  updatedAt
}
    ${OrderItemFragmentDoc}
${BillingAddressFragmentDoc}
${ShippingAddressFragmentDoc}
${OrderTrackFragmentDoc}`;