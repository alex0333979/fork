import React, { useCallback, useState } from 'react'
import { PrismicRichText } from '@prismicio/react'

import FaqItem from '@/modules/home/faqItem'
import { scrollToTop } from '@/utils'

interface Props {
  slice?: any
}

const Faq: React.FC<Props> = ({ slice }) => {
  const [allClosed, setAllClosed] = useState<boolean>(false)

  const onStart = useCallback(() => {
    scrollToTop()
    setAllClosed(true)
  }, [])

  const onOpenFaq = useCallback(() => {
    setAllClosed(false)
  }, [])

  const faqs = slice.items || []

  return (
    <div className="faq-section" id="faq">
      <div className="container">
        <div className="data-wrap">
          <div className="sub-title">
            <PrismicRichText field={slice.primary.faq_title} />
            <PrismicRichText field={slice.primary.faq_text} />
          </div>
          <div className="faq-list">
            <ul>
              {faqs.map((faq: any, index: number) => (
                <FaqItem
                  key={index}
                  faq={faq}
                  allClosed={allClosed}
                  onOpen={onOpenFaq}
                />
              ))}
            </ul>
          </div>
          <div className="start-btn">
            <button className="main-btn big" onClick={onStart}>
              <PrismicRichText field={slice.primary.faq_button} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faq
