import React, { useMemo } from 'react'
import NextImage from 'next/image'

interface Props {
  selectedImage: File | undefined
  percentage: number
  onCancelUpload: () => void
  slice: any
}

const PhotoProcessing: React.FC<Props> = ({
  selectedImage,
  percentage,
  onCancelUpload,
  slice,
}) => {
  const UserImage = useMemo(() => {
    if (selectedImage) {
      return (
        <span>
          <NextImage
            src={URL.createObjectURL(selectedImage)}
            width="100%"
            height="100%"
            layout="fill"
            alt="Thumb"
          />
        </span>
      )
    }

    return null
  }, [selectedImage])

  return (
    <div className="step-tab">
      <div className="uploading-progress">
        <div className="sub-title">
          <h3>Please wait...</h3>
        </div>
        <div className="progress-line">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="22.5"
              fill="transparent"
              strokeWidth="3"
              strokeDasharray={`${(percentage * 295) / 100}%,1000`}
              strokeDashoffset="0"
            />
          </svg>
          {UserImage}
        </div>
        <div className="text">
          <p>{`${percentage}%`}</p>
        </div>
      </div>
      <div className="btn-wrap single">
        <div className="action-btn">
          <button
            type="button"
            className="main-btn no-border"
            onClick={onCancelUpload}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default PhotoProcessing
