import React from 'react'
import { Bars } from 'react-loading-icons'
import { PrismicRichText } from '@prismicio/react'

import { ProcessingStatus } from '@/types'
import { PhotoProps } from 'slices/proceed_to_checkout'

interface Props {
  loading: boolean
  status: ProcessingStatus
  onSave: () => void
  onOpenInfo: (v: boolean) => void
}

const SaveButton: React.FC<Props & PhotoProps> = ({
  loading,
  status,
  onSave,
  onOpenInfo,
  page,
}) => (
  <div className="btn-wrap single">
    <div className="action-btn">
      <button
        type="button"
        className="main-btn"
        onClick={onSave}
        disabled={status !== ProcessingStatus.success}>
        {loading ? (
          <Bars height={25} fill="#FFFFFF" stroke="transparent" />
        ) : (
          <span className="prismic-content">
            {page?.data.slices?.[1]?.primary?.save_button ? (
              <PrismicRichText
                field={page?.data.slices?.[1]?.primary?.save_button}
              />
            ) : (
              'Save'
            )}
          </span>
        )}
      </button>
    </div>
    <div className="info-btn">
      <button
        type="button"
        className="main-btn outline"
        onClick={() => onOpenInfo(true)}>
        <i className="icon-info" />
      </button>
    </div>
  </div>
)
export default SaveButton
