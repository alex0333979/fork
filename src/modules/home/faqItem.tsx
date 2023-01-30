import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

import { IFAQ } from './types'
import { PrismicDocument } from '@prismicio/types'
import { PrismicRichText } from '@prismicio/react'

interface Props {
  faq: IFAQ
  allClosed?: boolean
  onOpen?: () => void
  page?: PrismicDocument<Record<string, any>, string, string>
  index: number
}

const FaqItem: React.FC<Props> = ({ faq, allClosed, page, index, onOpen }) => {
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
          <PrismicRichText field={page?.data.slices[2].items[index].faq_question}/>
          <span className="icon-close" />
        </h3>
      </div>
      <div className="answer">
        <PrismicRichText field={page?.data.slices[2].items[index].faq_answer}/>
      </div>
    </li>
  )
}

export default FaqItem
