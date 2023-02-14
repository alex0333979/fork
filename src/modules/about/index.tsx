import React from 'react'
import { SliceZone } from '@prismicio/react'
import { PrismicDocument } from '@prismicio/types'

import { components } from 'slices'
import Summary from './summary'

export interface AboutProps {
  page?: PrismicDocument<Record<string, any>, string, string>
}

export interface SliceProps {
  slice?: any
  context?: any
  column?: boolean
}

const About: React.FC<AboutProps> = ({ page }) => (
  <>
    <Summary page={page} />
    <SliceZone slices={page?.data.slices} components={components} />
  </>
)

export default About
