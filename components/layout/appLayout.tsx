import React from 'react'
import WoopraScript from '@/components/scripts/woopra'
import { AppFooter, AppHeader } from '../index'

interface AppLayoutProps {
  children: React.ReactNode
}
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => (
  <>
    <AppHeader />
    <main>{children}</main>
    <AppFooter />
    <WoopraScript />
  </>
)

export default AppLayout
