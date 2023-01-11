/* eslint-disable prettier/prettier */
import React, { useCallback } from 'react'
import ModalContainer from '@/components/elements/modalContainer'
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import { createFileFromBase64, showError } from '@/utils'

interface TakePhotoProps {
  country: string
  open: boolean
  idealFacingMode: string
  closeTakePhoto: () => void
  takePhoto: (file: File) => void
}

const TakePhotoModal: React.FC<TakePhotoProps> = ({
  country,
  open,
  closeTakePhoto,
  takePhoto,
  idealFacingMode,
}) => {
  const handleTakePhotoAnimationDone = useCallback(
    (dataUri: string) => {
      const file = createFileFromBase64(dataUri)
      takePhoto(file)
    },
    [takePhoto],
  )

  const handleCameraError = useCallback((error: Error) => {
    showError(error.message)
  }, [])

  return (
    <ModalContainer
      open={open}
      className={`take-photo-${country.replace(/ /g, '')}`}
      closeModal={() => closeTakePhoto()}
    >
      {open && (
        <Camera
          onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
          idealFacingMode={
            idealFacingMode === FACING_MODES.ENVIRONMENT
              ? FACING_MODES.ENVIRONMENT
              : FACING_MODES.USER
          }
          imageType={IMAGE_TYPES.JPG}
          // idealResolution={{ width: 1500, height: country === 'Canada' ? 1875 : 1500  }}
          isMaxResolution={country === 'Canada' ? true : false}
          isDisplayStartCameraError={false}
          onCameraError={handleCameraError}
          isFullscreen={false}
          isImageMirror={idealFacingMode !== FACING_MODES.ENVIRONMENT}
        />
      )}
    </ModalContainer>
  )
}

export default TakePhotoModal
