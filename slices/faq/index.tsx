import React, { useCallback, useMemo, useState } from 'react'
import { PrismicDocument } from '@prismicio/types'
import { PrismicRichText } from '@prismicio/react'

import FaqItem from '@/modules/home/faqItem'
import { scrollToTop } from '@/utils'
import { Country } from '@/apollo'
import { IFAQ } from '@/modules/home/types'

interface Props {
  // country: Country | null
  // extraPath?: string | null
  slice?: any
}

const Faq: React.FC<Props> = ({ /*country, extraPath,*/slice }) => {
  const [allClosed, setAllClosed] = useState<boolean>(false)

  const onStart = useCallback(() => {
    scrollToTop()
    setAllClosed(true)
  }, [])

  const onOpenFaq = useCallback(() => {
    setAllClosed(false)
  }, [])

  // const faqs: IFAQ[] = useMemo(() => {
  //   if (!extraPath) return Faqs.default
  //   if (country?.countryCode?.toLowerCase() === 'gb') {
  //     return Faqs[`${extraPath}-gb`]
  //   }
  //   if (country?.countryCode?.toLowerCase() === 'ca') {
  //     return Faqs[extraPath]
  //   }

  //   return Faqs[extraPath] || Faqs.default
  // }, [country?.countryCode, extraPath])
  const faqs: IFAQ[] = slice.items

  return (
    <div className="faq-section" id="faq">
      <div className="container">
        <div className="data-wrap">
          <div className="sub-title">
            <h2><PrismicRichText field={slice.primary.faq_title} /></h2>
            <PrismicRichText field={slice.primary.faq_text} />
          </div>
          <div className="faq-list">
            <ul>
              {faqs.map((faq: { key: string, question: string, answer: React.ReactNode }, index: number) => (
                <FaqItem
                  key={faq.key}
                  faq={faq}
                  allClosed={allClosed}
                  onOpen={onOpenFaq}
                  slice={slice}
                  index={index}
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
