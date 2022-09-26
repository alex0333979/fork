import React, { useState } from 'react'
import classNames from 'classnames'

interface Props {
  className?: string
  title: string
  renderRight?: () => React.ReactNode
  children: React.ReactNode
}

const Accordion: React.FC<Props> = ({
  className,
  title,
  renderRight,
  children,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <div
      className={classNames('accordion-container', {
        expanded,
        [className || '']: !!className,
      })}>
      <div className="accordion-header" onClick={() => setExpanded(!expanded)}>
        <div className="accordion-title">{title}</div>
        <div className="accordion-icon">
          <img src="/images/chevron-down.svg" alt="" />
        </div>
        {!!renderRight && renderRight()}
      </div>
      <div className="accordion-content">{children}</div>
    </div>
  )
}

export default Accordion
