import React from 'react'
import { Bars } from 'react-loading-icons'

import { ProcessingStatus } from '../types'

interface Props {
  loading: boolean
  status: ProcessingStatus
  onSave: () => void
  onOpenInfo: (v: boolean) => void
}

const SaveButton: React.FC<Props> = ({
  loading,
  status,
  onSave,
  onOpenInfo,
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
          <span>Save</span>
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
