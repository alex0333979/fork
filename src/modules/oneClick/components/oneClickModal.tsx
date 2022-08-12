import React from 'react'
import classNames from 'classnames'

interface Props {
  className?: string
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const OneClickModal: React.FC<Props> = ({
  className,
  open,
  onClose,
  children,
}) => (
  <div className={classNames('modal-wrap', { className: !!className, open })}>
    <div className="overlay" />
    <div className="modal-content">
      <div className="close-btn">
        <button type="button" onClick={onClose}>
          <span className="icon-close" />
        </button>
      </div>
      <div className="content-scroll">{children}</div>
    </div>
  </div>
)

export default OneClickModal
