import React, { useEffect } from 'react'
import classNames from 'classnames'

interface Props {
  className?: string
  open?: boolean
  onClose?: () => void
  preventBodyScroll?: boolean
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({
  className,
  open,
  onClose,
  preventBodyScroll = true,
  children,
}) => {
  useEffect(() => {
    if (open && preventBodyScroll) {
      document.body.classList.add('scroll-lock')
    } else {
      document.body.classList.remove('scroll-lock')
    }
  }, [open, preventBodyScroll])

  return (
    <>
      <div
        className={classNames('modal-wrap', {
          [className || '']: !!className,
          open: Boolean(open),
        })}>
        <div className="overlay" />
        <div className="modal-content">
          {onClose && (
            <div className="close-btn">
              <button type="button" onClick={onClose}>
                <span className="icon-close" />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal
