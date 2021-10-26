import type { NextPage } from 'next';
import PhotoLayout from '@/components/layout/photoLayout';
import PhotoStep1 from '@/components/photo/step1';
import React from 'react';

const PhotoStep1Page: NextPage = () => (
  <PhotoLayout>
    <PhotoStep1 />
  </PhotoLayout>
);

export default PhotoStep1Page;
