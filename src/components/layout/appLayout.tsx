import React from 'react'
import { AppFooter, AppHeader } from '../index'

interface AppLayoutProps {
  showNav?: boolean
  children: React.ReactNode
}
const AppLayout: React.FC<AppLayoutProps> = ({ showNav = true, children }) => (
  <>
    <AppHeader showNav={showNav} />
    <main>{children}</main>
    <AppFooter showNav={showNav} />
  </>
)

export default AppLayout
