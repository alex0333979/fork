import React from 'react'
import { useRouter, NextRouter } from 'next/router'

import { ProcessPhotoProps } from '@/pages/photo/process-photo'
import { PAGES } from '@/constants'
import { useProcessPhoto } from '@/hooks'
import { ProcessingStatus } from '@/types'
import RetakeButton from './components/retakeButton'
import ApplicationModal from './components/applicationModal'
import VerifyPhoto from './_verifyPhoto'

const ProcessPhoto: React.FC<ProcessPhotoProps> = ({
  entry,
  type,
  document,
}) => {
  const router = useRouter()

  const {
    loading,
    openApplication,
    onCheckout,
    onGoToCart,
    onGoToApplication,
  } = useProcessPhoto({
    document,
    entry,
    onGoCart: () => router.push(PAGES.cart),
    onGoToApplication: () => router.push(PAGES.application.create),
  })

  return (
    <>
      <VerifyPhoto
        showStep
        entry={entry}
        type={type}
        document={document}
        onCheckout={onCheckout}
        onChangePhoto={() =>
          router.push(
            `${PAGES.photo.takePhoto}?entryId=${entry.id}&type=${type}&documentId=${document.id}`,
          )
        }
        renderTitle={(s: ProcessingStatus) => {
          if (
            s === ProcessingStatus.loading ||
            s === ProcessingStatus.notStarted
          ) {
            return 'Processing...'
          }
          if (s === ProcessingStatus.failed) {
            return (
              <>
                <span className="failed">Not approved </span>- See Requirements
                Below and Retake Photo
              </>
            )
          }

          return (
            <>
              <span className="success">Success </span>- Proceed To Checkout
            </>
          )
        }}
        renderRetakeButton={(
          status: ProcessingStatus,
          router: NextRouter,
          onOpenInfo: (v: boolean) => void,
          imageLink: string,
        ) => (
          <RetakeButton
            loading={loading}
            status={status}
            onRetake={() =>
              router.push(
                `${PAGES.photo.takePhoto}?entryId=${entry.id}&documentId=${document.id}`,
              )
            }
            onNext={() => onCheckout(imageLink)}
            onOpenInfo={onOpenInfo}
          />
        )}
      />
      <ApplicationModal
        open={openApplication}
        onGoApplication={onGoToApplication}
        onGoCart={onGoToCart}
      />
    </>
  )
}
export default ProcessPhoto
