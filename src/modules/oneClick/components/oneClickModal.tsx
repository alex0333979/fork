import React from 'react'

import Modal from '@/components/elements/modal'

interface Props {
  className?: string
  open: boolean
  onClose: () => void | undefined
  children: React.ReactNode
}

const OneClickModal: React.FC<Props> = ({
  className,
  open,
  onClose,
  children,
}) => (
  <Modal className={`general ${className || ''}`} open={open} onClose={onClose}>
    <div className="content-scroll">{children}</div>
  </Modal>
)

export default OneClickModal
