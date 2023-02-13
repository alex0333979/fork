import React from 'react'

import PhotoHeader from '@/components/layout/photoHeader'
import { PrismicDocument } from '@prismicio/types'

interface AppLayoutProps {
  children: React.ReactNode
  page?: PrismicDocument<Record<string, any>, string, string>
}
const PhotoLayout: React.FC<AppLayoutProps> = ({ children, page }) => (
  <>
    <PhotoHeader page={page} />
    <main>{children}</main>
  </>
)

export default PhotoLayout
