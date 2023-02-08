import React, { useState } from 'react'
import { useRouter, NextRouter } from 'next/router'

import { ProcessPhotoProps } from '@/pages/photo/process-photo'
import { PAGES } from '@/constants'
import { useProcessPhoto } from '@/hooks'
import { ProcessingStatus } from '@/types'
import { showSuccess } from '@/utils'
import RetakeButton from './components/retakeButton'
import ApplicationModal from './components/applicationModal'
import VerifyPhoto from './_verifyPhoto'

const ProcessPhoto: React.FC<ProcessPhotoProps> = ({
  entry,
  type,
  document,
  page,
}) => {
  const router = useRouter()
  const [openApplication, setOpenApplication] = useState<boolean>(false)

  const { loading, onCheckout } = useProcessPhoto({
    document,
    entry,
    onItemAddedToCart: () => {
      showSuccess('This entry is added to cart.')
      if (document.id === 495) {
        // document.id === 489
        // only for US passport and UK passport
        setOpenApplication(true)
        // await router.push(PAGES.upSell);
        // await router.push(PAGES.cart);
      } else {
        router.push(PAGES.cart)
      }
    },
  })

  return (
    <>
      <VerifyPhoto
        showStep
        entry={entry}
        type={type}
        page={page}
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
            page={page}
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
        onGoApplication={() => {
          setOpenApplication(false)
          router.push(PAGES.application.create)
        }}
        onGoCart={() => {
          setOpenApplication(false)
          router.push(PAGES.cart)
        }}
      />
    </>
  )
}
export default ProcessPhoto
