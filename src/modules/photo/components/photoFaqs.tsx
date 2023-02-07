import React from 'react'
import FaqItem from '@/modules/home/faqItem'
import { AdviceListProps } from 'slices/advice_list'

const PhotoFaqs: React.FC<AdviceListProps> = ({ slice }) => (
  <div className="faq-section">
    <div className="faq-list">
      <ul>
        {slice.items.map((item: any, index: number) => (
          <FaqItem key={index} faq={item} />
        ))}
      </ul>
    </div>
  </div>
)

export default PhotoFaqs
