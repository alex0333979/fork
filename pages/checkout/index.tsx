import type { NextPage } from 'next';
import React from 'react';
import { AppLayout } from '../../components';
import DeliveryMethod from '@/components/checkout/deliveryMethod';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { initializeApollo } from '@/lib/apolloClient';
import { ApolloQueryResult } from '@apollo/client';
import { CartDocument, CartQuery } from '@/generated/graphql';

const CheckoutPage: NextPage = () => (
  <AppLayout>
    <DeliveryMethod />
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const client = initializeApollo(null, context);

    const result: ApolloQueryResult<CartQuery> = await client.query({
      query: CartDocument
    });
    const cart = result.data.Cart.data;

    if (cart?.items?.length ?? 0 > 0) {
      return {
        props: {}
      };
    } else {
      return {
        redirect: {
          destination: `/cart`,
          permanent: false
        }
      };
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/cart',
        permanent: false
      }
    };
  }
};

export default CheckoutPage;
