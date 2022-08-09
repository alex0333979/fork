import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

import { IFAQ } from './types'

interface Props {
  faq: IFAQ
  allClosed?: boolean
  onOpen?: () => void
}

const FaqItem: React.FC<Props> = ({ faq, allClosed, onOpen }) => {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    if (allClosed) {
      console.log('here')
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
          {faq.question} <span className="icon-close" />
        </h3>
      </div>
      <div className="answer">{faq.answer}</div>
    </li>
  )
}

export default FaqItem
