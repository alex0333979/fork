import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FACING_MODES } from 'react-html5-camera-photo'
import { useMediaQuery } from '@material-ui/core'
import { PrismicRichText } from '@prismicio/react'
import { PrismicDocument } from '@prismicio/types'

import { useDocumentQuery } from '@/apollo'
import TakePhotoModal from '@/components/elements/takePhotoModal'

interface Props {
  camera: 'user' | 'environment'
  onChangeCamera: (c: 'user' | 'environment') => void
  onStartUpload: () => void
  onPhotoTaken: (f: File) => Promise<void>
  page?: PrismicDocument<Record<string, any>, string, string>
}

const UploadPhoto: React.FC<Props> = ({
  camera,
  onStartUpload,
  onChangeCamera,
  onPhotoTaken,
  page,
}) => {
  const router = useRouter()
  const [openCamera, setOpenCamera] = useState<boolean>(false)
  const [docCountry, setDocCountry] = useState<string>('')
  const matches = useMediaQuery('only screen and (max-width: 1024px)')

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

  const hideSelfie = useMemo(
    () => router.query.documentId === '83' && matches, // Canada passport
    [matches, router.query.documentId],
  )

  useEffect(() => {
    if (hideSelfie) {
      onChangeCamera(FACING_MODES.ENVIRONMENT)
    }
  }, [hideSelfie, onChangeCamera])

  console.log({ aa: page?.data.step_options })
  return (
    <>
      <div className="title prismic-content">
        <PrismicRichText field={page?.data.step_title} />
        <PrismicRichText field={page?.data.step_text} />
      </div>
      <div className="method-option">
        {!hideSelfie && (
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
                <Image
                  src={page?.data.step_options[0]?.option_image.url}
                  width={
                    page?.data.step_options[0]?.option_image.dimensions.width
                  }
                  height={
                    page?.data.step_options[0]?.option_image.dimensions.height
                  }
                  layout="fill"
                  alt=""
                />
              </span>
              <span className="name prismic-content">
                <PrismicRichText
                  field={page?.data.step_options[0].option_text}
                />
              </span>
            </span>
          </label>
        )}

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
              <div className="img prismic-content">
                <Image
                  src={page?.data.step_options[1]?.option_image.url}
                  width={
                    page?.data.step_options[1]?.option_image.dimensions.width
                  }
                  height={
                    page?.data.step_options[1]?.option_image.dimensions.height
                  }
                  layout="fill"
                  alt=""
                />
              </div>
              <span className="name prismic-content">
                <PrismicRichText
                  field={page?.data.step_options[1]?.option_text}
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
