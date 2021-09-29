import type { NextPage } from 'next';
import React from 'react';
import { AppLayout } from '../../components';
import ReviewAndPay from '@/components/checkout/review';

const ReviewAndPayPage: NextPage = () => (
  <AppLayout>
    <ReviewAndPay />
  </AppLayout>
);

export { getServerSideProps } from './index';

export default ReviewAndPayPage;
