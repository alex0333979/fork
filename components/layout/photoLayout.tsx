import React from 'react';
import PhotoHeader from '@/components/layout/photoHeader';

interface AppLayoutProps {
  children: React.ReactNode;
}
const PhotoLayout: React.FC<AppLayoutProps> = ({ children }) => (
  <>
    <PhotoHeader />
    <main>{children}</main>
  </>
);

export default PhotoLayout;
