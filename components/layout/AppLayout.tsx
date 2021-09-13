import React from 'react';
import { AppFooter, AppHeader } from '../index';

type AppLayoutProps = {
  children: React.ReactNode;
};
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
      <AppFooter />
    </>
  );
};

export default AppLayout;
