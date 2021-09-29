import type { NextPage } from 'next';
import React from 'react';
import { AppLayout } from '../../components';
import PaymentInformation from '@/components/checkout/paymentInformation';

const PaymentInfoPage: NextPage = () => (
  <AppLayout>
    <PaymentInformation />
  </AppLayout>
);

export { getServerSideProps } from './index';

export default PaymentInfoPage;
