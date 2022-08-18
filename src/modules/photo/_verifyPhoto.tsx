import React, { useCallback, useState } from 'react'
import { useRouter, NextRouter } from 'next/router'
import NextImage from 'next/image'
import classNames from 'classnames'

import { PAGES, PHOTO_STEP } from '@/constants'
import LoadingMask from '@/components/elements/loadingMask'
import LoadingSpinner from '@/components/loadingSpinner'
import { Entry, PDocument } from '@/apollo'
import { ProcessingStatus } from '@/types'
import { useVerifyPhoto } from '@/hooks'

import ProcessStepPhoto from './components/processStepPhoto'
import StepInfo from './components/stepInfo'
import TestCase from './components/testCase'

interface Props {
  entry?: Entry
  type: string
  photoUrl?: string
  document?: PDocument
  showStep?: boolean
  onCheckout?: (imageLink: string) => void
  onChangePhoto: () => void
  renderTitle: (status: ProcessingStatus) => React.ReactNode
  renderRetakeButton: (
    status: ProcessingStatus,
    router: NextRouter,
    onOpenInfo: (v: boolean) => void,
    imageLink: string,
  ) => React.ReactNode
}

const VerifyPhoto: React.FC<Props> = ({
  entry,
  photoUrl,
  type,
  document,
  showStep,
  onCheckout,
  renderTitle,
  renderRetakeButton,
}) => {
  const router = useRouter()
  const [openStepInfo, setOpenStepInfo] = useState<boolean>(false)

  const { status, imageUrl, imageLink, width, height, passed, failed } =
    useVerifyPhoto({
      entry,
      document,
      photoUrl,
    })

  const onChangePhoto = useCallback(() => {
    if (entry?.id && document?.id) {
      router.push(
        `${PAGES.photo.takePhoto}?entryId=${entry.id}&type=${type}&documentId=${document.id}`,
      )
    } else {
      router.push(PAGES.photo.takeNewPhoto)
    }
  }, [document?.id, entry?.id, router, type])

  return (
    <>
      {status === ProcessingStatus.loading && <LoadingMask />}
      <div className="steps-page">
        <div className="container">
          <div className="steps-content">
            <StepInfo
              status={status}
              openInfo={openStepInfo}
              onOpenInfo={(v: boolean) => setOpenStepInfo(v)}
            />
            <div className="step-data">
              <div className="data-wrap">
                {showStep && (
                  <ProcessStepPhoto
                    step={status === ProcessingStatus.success ? 3 : 2}
                    steps={PHOTO_STEP.steps}
                  />
                )}
                <div className="title big">
                  <h1>{renderTitle(status)}</h1>
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
                {renderRetakeButton(status, router, setOpenStepInfo, imageLink)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default VerifyPhoto
