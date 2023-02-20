import React from 'react'

import { AddAnotherButtonProps } from './types'

const AddAnotherButton: React.FC<AddAnotherButtonProps> = ({
  onAddAnother,
  title,
}) => (
  <div className="btn-wrap">
    <button
      type="button"
      className="main-btn small outline"
      onClick={onAddAnother}>
      {title}
      <span className="icon-close" />
    </button>
  </div>
)

export default AddAnotherButton
