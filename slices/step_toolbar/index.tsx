import React from 'react'
import NextImage from 'next/image'

interface PhotoStepInfoProps {
  slice?: any
}

const PhotoStepInfo: React.FC<PhotoStepInfoProps> = ({ slice }) => (
  <div className="step-info">
    <div className="info-toolbar">
      <p>
        <span className="icon-info" />
      </p>
      <button type="button">
        <span className="icon-close" />
      </button>
    </div>
    <div className="instruction-list">
      <ul>
        {slice.items.map((_item: object, index: number) => (
          <li key={index}>
            <div className="img">
              <span>
                <NextImage
                  src="/images/steps/step-02-01-v2.png"
                  layout="fill"
                  alt=""
                />
              </span>
            </div>
            <div className="text">
              <p>
                Position your head inside the green overlay. No glasses allowed.
                Your hair or clothing may not obscure your face
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
export default PhotoStepInfo
