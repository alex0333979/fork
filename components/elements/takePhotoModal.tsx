import React from 'react';
import ModalContainer from '@/components/elements/modalContainer';
import 'react-html5-camera-photo/build/css/index.css';

interface TakePhotoProps {
  open: boolean;
  idealFacingMode: string;
  closeTakePhoto: () => void;
  takePhoto: (file: File) => void;
}

const TakePhotoModal: React.FC<TakePhotoProps> = ({ open, closeTakePhoto }) => (
  <ModalContainer open={open} closeModal={() => closeTakePhoto()}>
    <div>Deploy test</div>
  </ModalContainer>
);

export default TakePhotoModal;
