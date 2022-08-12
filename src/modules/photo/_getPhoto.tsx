import React, { useRef } from 'react'

import { PHOTO_STEP } from '@/constants'
import { TOnSubmitEntry } from '@/types'
import { useGetPhoto } from '@/hooks'
import ProcessStepPhoto from './components/processStepPhoto'
import PhotoHelper from './components/photoHelperVideoModal'
import PhotoStepInfo from './components/photoStepInfo'
import ProcessingPhoto from './components/photoProcessing'
import UploadPhoto from './components/uploadPhoto'
import PhotoFaqs from './components/photoFaqs'

interface Props {
  onSubmitEntry: TOnSubmitEntry
}

const GetPhoto: React.FC<Props> = ({ onSubmitEntry }) => {
  const fileRef = useRef<HTMLInputElement>(null)

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
    <>
      <div className="steps-page">
        <div className="container">
          <div className="steps-content">
            <PhotoStepInfo />
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
                  />
                ) : (
                  <UploadPhoto
                    camera={camera}
                    onChangeCamera={onChangeCamera}
                    onStartUpload={() => fileRef?.current?.click()}
                    onPhotoTaken={onPhotoTaken}
                  />
                )}
                <PhotoHelper />
                <PhotoFaqs />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default GetPhoto
