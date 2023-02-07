import React from 'react'

import PhotoFaqs from '@/modules/photo/components/photoFaqs'

export interface AdviceListProps {
  slice: any
}

const AdviceList: React.FC<AdviceListProps> = ({ slice }) => (
  <div className="slice-faq-container">
    <div className="slice-step-data">
      <div className="slice-data-wrap">
        <PhotoFaqs slice={slice} />
      </div>
    </div>
  </div>
)

export default AdviceList
