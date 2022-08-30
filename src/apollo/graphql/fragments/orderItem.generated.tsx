import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type OrderItemFragment = { __typename?: 'OrderItem', id: string, productId: string, name: string, description: string, imageUrl?: string | null, productCategory?: Types.ProductCategory | null, productSku?: Types.ProductSku | null, isComplete: boolean, createdAt?: any | null, updatedAt?: any | null };

export const OrderItemFragmentDoc = gql`
    fragment OrderItem on OrderItem {
  id
  productId
  name
  description
  imageUrl
  productCategory
  productSku
  isComplete
  createdAt
  updatedAt
}
    `;