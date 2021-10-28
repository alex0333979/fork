import type { NextPage } from 'next';
import PhotoLayout from '@/components/layout/photoLayout';
import SelectType from '@/components/photo/selectType';
import React from 'react';

const SelectTypePage: NextPage = () => (
  <PhotoLayout>
    <SelectType />
  </PhotoLayout>
);

export default SelectTypePage;
