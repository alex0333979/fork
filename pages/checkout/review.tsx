import type { NextPage } from 'next';
import React from 'react';
import { AppLayout } from '../../components';
import ReviewAndPay from '@/components/checkout/review';
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '@/lib/utils/getStripe';

const ReviewAndPayPage: NextPage = () => (
  <AppLayout>
    <Elements stripe={getStripe()}>
      <ReviewAndPay />
    </Elements>
  </AppLayout>
);

export { getServerSideProps } from './index';

export default ReviewAndPayPage;
