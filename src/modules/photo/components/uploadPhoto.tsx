import React from 'react'
import NextImage from 'next/image'
import { FACING_MODES } from 'react-html5-camera-photo'
import { useMediaQuery } from '@material-ui/core'

interface Props {
  camera: 'user' | 'environment'
  onChangeCamera: (c: 'user' | 'environment') => void
  onStartUpload: () => void
  onOpenCamera: () => void
}

const UploadPhoto: React.FC<Props> = ({
  camera,
  onStartUpload,
  onChangeCamera,
  onOpenCamera,
}) => {
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
            onClick={() => onOpenCamera()}>
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
    </>
  )
}

export default UploadPhoto
