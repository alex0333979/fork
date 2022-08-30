import React from 'react'
import ModalContainer from '@/components/elements/modalContainer'
import LoadingSpinner from '@/components/loadingSpinner'

interface PreviewPhotoModalProps {
  open: boolean
  url: string
  closeModal: () => void
}

const PreviewPhotoModal: React.FC<PreviewPhotoModalProps> = ({
  open,
  closeModal,
  url,
}) => (
  <ModalContainer open={open} closeModal={() => closeModal()}>
    {open && (
      <div className="preview-cart-item">
        <LoadingSpinner size={40} variant="oval" />
        <img src={url} alt="" />
      </div>
    )}
  </ModalContainer>
)

export default PreviewPhotoModal
