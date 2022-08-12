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
      document.body.style.overflow = 'hidden'
      document.body.style.maxHeight = '100vh'
    } else {
      document.body.style.overflow = 'inherit'
      document.body.style.maxHeight = 'inherit'
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
