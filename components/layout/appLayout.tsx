import React from 'react'
import WoopraScript from '@/components/trackingTags/woopra'
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
