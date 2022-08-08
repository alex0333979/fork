import React from 'react'

import { AddAnotherButtonProps } from './types'

const AddAnotherButton: React.FC<AddAnotherButtonProps> = ({
  onAddAnother,
}) => (
  <div className="btn-wrap">
    <button
      type="button"
      className="main-btn small outline"
      onClick={onAddAnother}>
      Add Another Person&apos;s Photo
      <span className="icon-close" />
    </button>
  </div>
)

export default AddAnotherButton
