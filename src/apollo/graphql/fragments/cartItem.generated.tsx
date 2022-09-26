import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type CartItemFragment = { __typename?: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: string | null, productCategory?: Types.ProductCategory | null, productSku?: Types.ProductSku | null, isComplete: boolean, expeditingService?: string | null, createdAt?: any | null, updatedAt?: any | null };

export const CartItemFragmentDoc = gql`
    fragment CartItem on CartItem {
  id
  productId
  name
  description
  imageUrl
  productCategory
  productSku
  isComplete
  expeditingService
  createdAt
  updatedAt
}
    `;