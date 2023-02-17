import React, { useRef } from 'react'
import { PrismicDocument } from '@prismicio/types'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { createClient } from 'prismicio'

import PhotoHelper from '@/modules/photo/components/photoHelperVideoModal'
import ProcessStepPhoto from '@/modules/photo/components/processStepPhoto'
import UploadPhoto from '@/modules/photo/components/uploadPhoto'
import ProcessingPhoto from '@/modules/photo/components/photoProcessing'
import { useGetPhoto } from '@/hooks'
import { PHOTO_STEP } from '@/constants'
import { TOnSubmitEntry } from '@/types'
import { PageTypeHashes, PageUIDHashes } from '@/constants/PageUIDHashes'

export interface ProceedToCheckoutProps {
  onSubmitEntry?: TOnSubmitEntry
  slice?: any
  context?: any
}

export interface PhotoProps {
  locale?: string
  page?: PrismicDocument<Record<string, any>, string, string>
}

const ProceedToCheckout: React.FC<ProceedToCheckoutProps & PhotoProps> = ({
  context,
}) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const { onSubmitEntry, page } = context
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
          />
        ) : (
          <UploadPhoto
            camera={camera}
            onChangeCamera={onChangeCamera}
            onStartUpload={() => fileRef?.current?.click()}
            onPhotoTaken={onPhotoTaken}
            page={page}
          />
        )}
        <PhotoHelper /* articlePage={context.articlePage}*/ />
      </div>
    </div>
  )
}

export default ProceedToCheckout

export const getServerSideProps: GetServerSideProps<PhotoProps> = async (
  context: GetServerSidePropsContext,
) => {
  const previewData = context.previewData
  const client = createClient({ previewData })
  const page = await client.getByUID(
    PageTypeHashes.landingPage,
    PageUIDHashes.homepage,
  )

  return {
    props: {
      page,
    },
  }
}
