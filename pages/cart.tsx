import type { NextPage } from 'next';
import React from 'react';
import { AppLayout } from '../components';
import ShoppingCart from '@/components/cart/shoppingCart';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { initializeApollo } from '@/lib/apolloClient';
import { Cart, CartDocument, CartQuery, ShippingType } from '@/generated/graphql';
import { ApolloQueryResult } from '@apollo/client';

export interface CartPageProps {
  cart: Cart;
}

const CartPage: NextPage<CartPageProps> = ({ cart }) => (
  <AppLayout>
    <ShoppingCart cart={cart} />
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps<CartPageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const client = initializeApollo(null, context);
    const result: ApolloQueryResult<CartQuery> = await client.query({
      query: CartDocument
    });
    const cart = result.data?.Cart.data;

    if (!cart) {
      return {
        props: {
          cart: {
            items: [],
            totalPrice: 0,
            shippingType: ShippingType.Free
          }
        }
      };
    }

    return {
      props: {
        cart
      }
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
};

export default CartPage;
