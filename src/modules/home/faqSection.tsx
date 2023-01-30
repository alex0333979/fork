import React, { useCallback, useMemo, useState } from 'react'

import { scrollToTop } from '@/utils'
import { Country } from '@/apollo'

import FaqItem from './faqItem'
import { Faqs } from './constant'
import { IFAQ } from './types'
import { PrismicDocument } from '@prismicio/types'
import { PrismicRichText } from '@prismicio/react'

interface Props {
  country: Country | null
  extraPath?: string | null
  page?: PrismicDocument<Record<string, any>, string, string>
}

const FaqSection: React.FC<Props> = ({ country, extraPath, page }) => {
  const [allClosed, setAllClosed] = useState<boolean>(false)

  const onStart = useCallback(() => {
    scrollToTop()
    setAllClosed(true)
  }, [])

  const onOpenFaq = useCallback(() => {
    setAllClosed(false)
  }, [])

  const faqs: IFAQ[] = useMemo(() => {
    if (!extraPath) return Faqs.default
    if (country?.countryCode?.toLowerCase() === 'gb') {
      return Faqs[`${extraPath}-gb`]
    }
    if (country?.countryCode?.toLowerCase() === 'ca') {
      return Faqs[extraPath]
    }

    return Faqs[extraPath] || Faqs.default
  }, [country?.countryCode, extraPath])

  return (
    <div className="faq-section" id="faq">
      <div className="container">
        <div className="data-wrap">
          <div className="sub-title">
            <h2><PrismicRichText field={page?.data.slices[2].primary.faq_title} /></h2>
            <PrismicRichText field={page?.data.slices[2].primary.faq_text} />
          </div>
          <div className="faq-list">
            <ul>
              {faqs.map((faq, index) => (
                <FaqItem
                  key={faq.key}
                  faq={faq}
                  allClosed={allClosed}
                  onOpen={onOpenFaq}
                  page={page}
                  index={index}
                />
              ))}
            </ul>
          </div>
          <div className="start-btn">
            <button className="main-btn big" onClick={onStart}>
              <PrismicRichText field={page?.data.slices[2].primary.faq_button} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaqSection
