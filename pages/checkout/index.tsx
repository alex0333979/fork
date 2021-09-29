import type { NextPage } from 'next';
import React from 'react';
import { AppLayout } from '../../components';
import DeliveryMethod from '@/components/checkout/deliveryMethod';

const CheckoutPage: NextPage = () => (
  <AppLayout>
    <DeliveryMethod />
  </AppLayout>
);

export default CheckoutPage;
