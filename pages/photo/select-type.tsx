import type { NextPage } from 'next';
import PhotoLayout from '@/components/layout/photoLayout';
import SelectType from '@/components/photo/selectType';
import React from 'react';
import { NextSeo } from 'next-seo';
import { SEO } from '../../constants';

const SelectTypePage: NextPage = () => (
  <>
    <NextSeo title={SEO.selectType.title} description={SEO.selectType.description} />
    <PhotoLayout>
      <SelectType />
    </PhotoLayout>
  </>
);

export default SelectTypePage;
