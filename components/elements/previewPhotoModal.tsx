import React from 'react';
import ModalContainer from '@/components/elements/modalContainer';

interface PreviewPhotoModalProps {
  open: boolean;
  url: string;
  closeModal: () => void;
}

const PreviewPhotoModal: React.FC<PreviewPhotoModalProps> = ({ open, closeModal, url }) => (
  <ModalContainer open={open} closeModal={() => closeModal()}>
    {open && <img src={url} alt={''} />}
  </ModalContainer>
);

export default PreviewPhotoModal;
