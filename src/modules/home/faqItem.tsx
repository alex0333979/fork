import React, { useState, useEffect } from 'react'
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import classNames from 'classnames'

interface Props {
  faq: any
  allClosed?: boolean
  onOpen?: () => void
}

const FaqItem: React.FC<Props> = ({ faq, allClosed, onOpen }) => {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    if (allClosed) {
      setShow(false)
    }
  }, [allClosed])

  return (
    <li className={classNames({ open: show })}>
      <div className="question prismic-content">
        <h3
          onClick={() => {
            if (onOpen) onOpen()
            setShow(!show)
          }}>
          <PrismicRichText
            field={faq.advice_title ? faq.advice_title : faq.faq_question}
          />
          <span className="icon-close" />
        </h3>
      </div>
      <div className="answer prismic-content">
        <PrismicRichText
          field={faq.advice_text ? faq.advice_text : faq.faq_answer}
        />

        <div>
          {faq.correct_example && (
            <div className="attached-images prismic-content">
              <PrismicNextImage field={faq.correct_example} />
              <PrismicNextImage field={faq.wrong_example} />
              <PrismicNextImage field={faq.video_example} />
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export default FaqItem
