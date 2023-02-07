import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { FACING_MODES } from 'react-html5-camera-photo'
import { useMediaQuery } from '@material-ui/core'
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'

import { useDocumentQuery } from '@/apollo'
import TakePhotoModal from '@/components/elements/takePhotoModal'
import { PrismicContext } from '@/contexts'

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
  const router = useRouter()
  const [openCamera, setOpenCamera] = useState<boolean>(false)
  const [docCountry, setDocCountry] = useState<string>('')
  const matches = useMediaQuery('only screen and (max-width: 1024px)')
  const { pageData } = useContext(PrismicContext)

  console.error('here:>>>>', pageData)
  useDocumentQuery({
    fetchPolicy: 'cache-first',
    skip: !router.query.documentId,
    variables: {
      id: (router.query.documentId || '') as string,
    },
    onCompleted: (res) => {
      setDocCountry(res.Document.data?.country || '')
    },
  })

  return (
    <>
      <div className="title">
        <PrismicRichText field={pageData?.data.step_title} />
        <PrismicRichText field={pageData?.data.step_text} />
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
            <div className="img">
              <PrismicNextImage
                field={pageData?.data.step_options[0].option_image}
              />
            </div>
            <span className="name">
              <PrismicRichText
                field={pageData?.data.step_options[0].option_text}
              />
            </span>
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
              <div className="img">
                <PrismicNextImage
                  field={pageData?.data.step_options[1].option_image}
                />
              </div>
              <span className="name">
                <PrismicRichText
                  field={pageData?.data.step_options[1].option_text}
                />
              </span>
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
        country={docCountry}
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
