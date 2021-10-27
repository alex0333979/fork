import React, { useCallback, useState } from 'react';
import ModalContainer from '@/components/elements/modalContainer';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { showError } from '@/lib/utils/toast';
import { createFileFromBase64 } from '@/lib/utils/downloadFromBase64';

interface TakePhotoProps {
  open: boolean;
  closeTakePhoto: () => void;
  takePhoto: (file: File) => void;
}

const TakePhotoModal: React.FC<TakePhotoProps> = ({ open, closeTakePhoto, takePhoto }) => {
  const handleTakePhotoAnimationDone = useCallback(
    (dataUri: string) => {
      const file = createFileFromBase64(dataUri);
      takePhoto(file);
    },
    [takePhoto]
  );

  const handleCameraError = useCallback((error: Error) => {
    console.log(error);
    showError(error.message);
  }, []);

  return (
    <ModalContainer open={open} closeModal={() => closeTakePhoto()}>
      <Camera
        onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
        idealFacingMode={FACING_MODES.USER}
        imageType={IMAGE_TYPES.PNG}
        idealResolution={{ width: 480, height: 480 }}
        isDisplayStartCameraError={false}
        onCameraError={handleCameraError}
        isFullscreen={false}
      />
    </ModalContainer>
  );
};

export default TakePhotoModal;
