import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

import { PrismicRichText } from '@prismicio/react'

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
      <div className="question">
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
      <div className="answer">
        <PrismicRichText
          field={faq.advice_text ? faq.advice_text : faq.faq_answer}
        />
      </div>
    </li>
  )
}

export default FaqItem
