import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import NextImage from 'next/image'
import classNames from 'classnames'

import { PAGES, PHOTO_STEP } from '@/constants'
import LoadingMask from '@/components/elements/loadingMask'
import LoadingSpinner from '@/components/loadingSpinner'
import { Entry, PDocument } from '@/apollo'
import { ProcessingStatus } from '@/types'
import { useProcessPhoto, useVerifyPhoto } from '@/hooks'

import RetakeButton from '@/modules/photo/components/retakeButton'
import ProcessStepPhoto from '@/modules/photo/components/processStepPhoto'
import TestCase from '@/modules/photo/components/testCase'
import ApplicationModal from '@/modules/photo/components/applicationModal'

interface Props {
  entry: Entry
  document: PDocument
  onChangePhoto: () => void
}

const ProcessPhoto: React.FC<Props> = ({ entry, document, onChangePhoto }) => {
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

  const { status, imageUrl, imageLink, width, height, passed, failed } =
    useVerifyPhoto({
      entry,
      document,
    })

  const title = useMemo(() => {
    if (
      status === ProcessingStatus.loading ||
      status === ProcessingStatus.notStarted
    ) {
      return 'Processing...'
    }
    if (status === ProcessingStatus.failed) {
      return (
        <>
          <span className="failed">Not approved </span>- See Requirements Below
          and Retake Photo
        </>
      )
    }

    return (
      <>
        <span className="success">Success </span>- Proceed To Checkout
      </>
    )
  }, [status])

  return (
    <>
      {status === ProcessingStatus.loading && <LoadingMask />}
      <div className="steps-content">
        <div className="step-data">
          <div className="data-wrap">
            <ProcessStepPhoto
              step={status === ProcessingStatus.success ? 3 : 2}
              steps={PHOTO_STEP.steps}
            />
            <div className="title big">
              <h1>{title}</h1>
            </div>
          </div>

          <div className="photo-requirements">
            <div
              className={classNames('requirements-wrap', {
                failed: status === ProcessingStatus.failed,
              })}>
              <div className="img">
                <span
                  className="verified-image-wrapper"
                  style={{
                    width,
                    height,
                  }}>
                  <LoadingSpinner variant="oval" />
                  {!imageUrl ||
                    (status !== ProcessingStatus.loading && (
                      <NextImage
                        key={imageLink}
                        style={{ maxWidth: 'unset', maxHeight: 'unset' }}
                        width="100%"
                        height="100%"
                        layout="fill"
                        src={imageLink}
                        alt=""
                      />
                    ))}
                </span>
                {status === ProcessingStatus.success && onCheckout && (
                  <button
                    type="button"
                    className="main-btn"
                    onClick={() => onCheckout(imageLink)}>
                    Proceed To Checkout
                  </button>
                )}
                <button
                  type="button"
                  className="main-btn no-border"
                  onClick={onChangePhoto}>
                  <i className="icon-camera" />
                  Change Photo
                </button>
              </div>
              <TestCase status={status} passed={passed} failed={failed} />
            </div>
          </div>

          <div className="data-wrap">
            <RetakeButton
              loading={loading}
              status={status}
              onRetake={onChangePhoto}
              onNext={() => onCheckout(imageLink)}
            />
          </div>
        </div>
      </div>

      <ApplicationModal
        open={openApplication}
        onGoApplication={onGoToApplication}
        onGoCart={onGoToCart}
      />
    </>
  )
}
export default ProcessPhoto
