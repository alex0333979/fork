import React, { useCallback, useMemo, useState } from 'react'
import FaqItem from '@/components/home/faqItem'
import { scrollToTop } from '@/utils'
import { Country } from '@/apollo'

import { Faqs } from './constant'
import { IFAQ } from './types'
interface Props {
  country: Country | null
  extraPath?: string | null
}

const FaqSection: React.FC<Props> = ({ country, extraPath }) => {
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

    return Faqs[extraPath] || Faqs.default
  }, [country?.countryCode, extraPath])

  return (
    <div className="faq-section" id="faq">
      <div className="container">
        <div className="data-wrap">
          <div className="sub-title">
            <h2>FAQ</h2>
            <p>Biometrically approved photos</p>
          </div>
          <div className="faq-list">
            <ul>
              {faqs.map((faq) => (
                <FaqItem
                  key={faq.key}
                  faq={faq}
                  allClosed={allClosed}
                  onOpen={onOpenFaq}
                />
              ))}
            </ul>
          </div>
          <div className="start-btn">
            <button className="main-btn big" onClick={onStart}>
              Start Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaqSection
