import type { NextPage } from 'next';
import PhotoLayout from '@/components/layout/photoLayout';
import React from 'react';
import ProcessPhoto from '@/components/photo/processPhoto';

const ProcessPhotoPage: NextPage = () => (
  <PhotoLayout>
    <ProcessPhoto />
  </PhotoLayout>
);

export default ProcessPhotoPage;
