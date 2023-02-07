import React, { useRef } from 'react'

import PhotoHelper from '@/modules/photo/components/photoHelperVideoModal'
import ProcessStepPhoto from '@/modules/photo/components/processStepPhoto'
import UploadPhoto from '@/modules/photo/components/uploadPhoto'
import ProcessingPhoto from '@/modules/photo/components/photoProcessing'
import { useGetPhoto } from '@/hooks'
import { PHOTO_STEP } from '@/constants'
import { TOnSubmitEntry } from '@/types'

export interface ProceedToCheckoutProps {
  onSubmitEntry: TOnSubmitEntry
  slice: any
  context: any
}

const ProceedToCheckout: React.FC<ProceedToCheckoutProps> = ({
  slice,
  context,
}) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const { onSubmitEntry } = context
  const {
    inProgress,
    percentage,
    selectedImage,
    camera,
    onChangeCamera,
    onFileChange,
    onPhotoTaken,
    onCancelUpload,
  } = useGetPhoto({
    fileRef,
    onSubmitEntry,
  })

  return (
    <div className="step-data">
      <div className="data-wrap">
        <ProcessStepPhoto step={1} steps={PHOTO_STEP.steps} />
        <input
          type="file"
          hidden
          accept="image/png"
          ref={fileRef}
          onChange={onFileChange}
        />
        {inProgress ? (
          <ProcessingPhoto
            selectedImage={selectedImage}
            percentage={percentage}
            onCancelUpload={onCancelUpload}
            slice={slice}
          />
        ) : (
          <UploadPhoto
            camera={camera}
            onChangeCamera={onChangeCamera}
            onStartUpload={() => fileRef?.current?.click()}
            onPhotoTaken={onPhotoTaken}
            page={context.page}
          />
        )}
        <PhotoHelper />
      </div>
    </div>
  )
}

export default ProceedToCheckout
