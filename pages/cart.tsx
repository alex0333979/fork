import type { NextPage } from 'next';
import React from 'react';
import { AppLayout } from '../components';
import ShoppingCart from '@/components/cart/shoppingCart';

const CartPage: NextPage = () => (
  <AppLayout>
    <ShoppingCart />
  </AppLayout>
);

export default CartPage;
