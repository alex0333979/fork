import { NextPage } from 'next';
import { AppLayout } from '@/components/index';
import React from 'react';
import ShippingPolicy from '@/components/shipping-policy';

const ShippingPolicyPage: NextPage = () => (
  <AppLayout>
    <ShippingPolicy />
  </AppLayout>
);

export default ShippingPolicyPage;
