import React from 'react';
import { AppFooter, AppHeader } from '../index';

interface AppLayoutProps {
  children: React.ReactNode;
}
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => (
  <>
    <AppHeader />
    <main>{children}</main>
    <AppFooter />
  </>
);

export default AppLayout;
