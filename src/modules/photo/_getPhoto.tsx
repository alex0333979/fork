import React from 'react'
import { SliceZone } from '@prismicio/react'

import { components } from 'slices'
import { TOnSubmitEntry } from '@/types'
import { TakeNewPhotoProps } from './takeNewPhoto'

interface Props {
  onSubmitEntry: TOnSubmitEntry
}

const GetPhoto: React.FC<Props & TakeNewPhotoProps> = ({
  page,
  onSubmitEntry,
}) => (
  <>
    <div className="steps-page">
      <div className="container">
        <div className="steps-content">
          <SliceZone
            slices={page?.data.slices}
            components={components}
            context={{ onSubmitEntry }}
          />
        </div>
      </div>
    </div>
  </>
)

export default GetPhoto
