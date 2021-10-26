import type { NextPage } from 'next';
import PhotoLayout from '@/components/layout/photoLayout';
import React from 'react';
import PhotoStep2 from '@/components/photo/step2';

const PhotoStep2Page: NextPage = () => (
  <PhotoLayout>
    <PhotoStep2 />
  </PhotoLayout>
);

export default PhotoStep2Page;
