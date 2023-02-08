import React from 'react'
import { Bars } from 'react-loading-icons'
import { PrismicRichText } from '@prismicio/react'

import { ProcessingStatus } from '@/types'
import { PhotoProps } from 'slices/proceed_to_checkout'

interface Props {
  loading: boolean
  status: ProcessingStatus
  onRetake: () => void
  onNext: () => Promise<void>
  onOpenInfo?: (v: boolean) => void
}

const RetakeButton: React.FC<Props & PhotoProps> = ({
  loading,
  status,
  onRetake,
  onNext,
  onOpenInfo,
  page,
}) => {
  if (status !== ProcessingStatus.success) {
    return (
      <div className="btn-wrap single">
        <div className="action-btn">
          <button type="button" className="main-btn" onClick={onRetake}>
            {status === ProcessingStatus.loading ? (
              <Bars height={25} fill="#FFFFFF" stroke="transparent" />
            ) : (
              <span>Try again</span>
            )}
          </button>
        </div>
        {!!onOpenInfo && (
          <div className="info-btn">
            <button
              type="button"
              className="main-btn outline"
              onClick={() => onOpenInfo(true)}>
              <i className="icon-info" />
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="btn-wrap">
      <div className="action-btn">
        <button
          type="button"
          className="main-btn outline retake-button"
          onClick={onRetake}>
          <i className="icon-left" />
          <span>
            <PrismicRichText
              field={page?.data.slices[1].primary.retake_button}
            />
          </span>
        </button>
        <button type="button" className="main-btn" onClick={onNext}>
          {loading ? (
            <Bars height={25} fill="#FFFFFF" stroke="transparent" />
          ) : (
            <>
              Checkout <span className="icon-right" />
            </>
          )}
        </button>
      </div>
      {!!onOpenInfo && (
        <div className="info-btn">
          <button
            type="button"
            className="main-btn outline"
            onClick={() => onOpenInfo(true)}>
            <i className="icon-info" />
          </button>
        </div>
      )}
    </div>
  )
}
export default RetakeButton
