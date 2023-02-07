import React from 'react'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'

interface PhotoStepInfoProps {
  slice?: any
}

const PhotoStepInfo: React.FC<PhotoStepInfoProps> = ({ slice }) => (
  <>
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
          {slice.items.map((item: any, index: number) => (
            <li key={index}>
              <div className="step-toolbar-img">
                <PrismicNextImage field={item.list_image} />
              </div>
              <div className="text">
                <PrismicRichText field={item.list_text} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>
)

export default PhotoStepInfo
