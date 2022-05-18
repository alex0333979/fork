import React from 'react'
import PhotoHeader from '@/components/layout/photoHeader'
import WoopraScript from '@/components/trackingTags/woopra'

interface AppLayoutProps {
  children: React.ReactNode
}
const PhotoLayout: React.FC<AppLayoutProps> = ({ children }) => (
  <>
    <PhotoHeader />
    <main>{children}</main>
    <WoopraScript />
  </>
)

export default PhotoLayout
