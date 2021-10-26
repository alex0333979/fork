import type { NextPage } from 'next';
import PhotoLayout from '@/components/layout/photoLayout';
import React from 'react';
import PhotoStep3 from '@/components/photo/step3';

const PhotoStep3Page: NextPage = () => (
  <PhotoLayout>
    <PhotoStep3 />
  </PhotoLayout>
);

export default PhotoStep3Page;
