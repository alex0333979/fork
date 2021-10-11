import type { NextPage } from 'next';
import React from 'react';
import { AppLayout } from '../../components';
import ShippingInformation from '@/components/checkout/shippingInformation';

const ShippingPage: NextPage = () => (
  <AppLayout>
    <ShippingInformation />
  </AppLayout>
);

export { getServerSideProps } from './index';

export default ShippingPage;
