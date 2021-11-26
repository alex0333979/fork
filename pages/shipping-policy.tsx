import { NextPage } from 'next';
import { AppLayout } from '@/components/index';
import React from 'react';
import ShippingPolicy from '@/components/shipping-policy';
import { NextSeo } from 'next-seo';
import { SEO } from '../constants';

const ShippingPolicyPage: NextPage = () => (
  <>
    <NextSeo title={SEO.shippingPolicy.title} description={SEO.shippingPolicy.description} />
    <AppLayout>
      <ShippingPolicy />
    </AppLayout>
  </>
);

export default ShippingPolicyPage;
