import React, { useState } from 'react'
import NextImage from 'next/image'
import { FACING_MODES } from 'react-html5-camera-photo'
import { useMediaQuery } from '@material-ui/core'

import TakePhotoModal from '@/components/elements/takePhotoModal'

interface Props {
  camera: 'user' | 'environment'
  onChangeCamera: (c: 'user' | 'environment') => void
  onStartUpload: () => void
  onPhotoTaken: (f: File) => Promise<void>
}

const UploadPhoto: React.FC<Props> = ({
  camera,
  onStartUpload,
  onChangeCamera,
  onPhotoTaken,
}) => {
  const [openCamera, setOpenCamera] = useState<boolean>(false)
  const matches = useMediaQuery('only screen and (max-width: 1024px)')

  return (
    <>
      <div className="title">
        <h1>Taking your shot on your own or having someone take it for you?</h1>
        <p>Select from the options below</p>
      </div>
      <div className="method-option">
        <label>
          <input
            type="radio"
            name="method"
            checked={camera === FACING_MODES.USER}
            hidden
            onChange={() => onChangeCamera(FACING_MODES.USER)}
          />
          <span className="option-wrap">
            <span className="bullet" />
            <span className="img">
              <NextImage
                src="/images/steps/step-01-01-v2.png"
                layout="fill"
                alt=""
              />
            </span>
            <span className="name">I&apos;ll take a selfie</span>
          </span>
        </label>

        {matches && (
          <label>
            <input
              type="radio"
              name="method"
              checked={camera === FACING_MODES.ENVIRONMENT}
              hidden
              onChange={() => onChangeCamera(FACING_MODES.ENVIRONMENT)}
            />
            <span className="option-wrap">
              <span className="bullet" />
              <span className="img">
                <NextImage
                  src="/images/steps/step-01-02-v2.png"
                  layout="fill"
                  alt=""
                />
              </span>
              <span className="name">Someone’s taking my photo</span>
            </span>
          </label>
        )}
      </div>
      <div className="btn-wrap">
        <div className="action-btn mobile-column">
          <button
            type="button"
            className="main-btn big"
            onClick={() => setOpenCamera(true)}>
            <span className="icon-camera" />
            Take A Photo
          </button>
          <button
            type="button"
            className="main-btn big outline upload-button"
            onClick={() => onStartUpload()}>
            <span className="icon-upload" />
            Upload
          </button>
        </div>
      </div>
      <TakePhotoModal
        open={openCamera}
        idealFacingMode={camera}
        closeTakePhoto={() => setOpenCamera(false)}
        takePhoto={async (f: File) => {
          setOpenCamera(false)
          await onPhotoTaken(f)
        }}
      />
    </>
  )
}

export default UploadPhoto
