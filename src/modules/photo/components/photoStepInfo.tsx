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
        <li>
          <div className="img">
            <span>
              <NextImage
                src="/images/steps/step-02-00-v2.png"
                layout="fill"
                alt=""
              />
            </span>
          </div>
          <div className="text">
            <p>
              Background is uniform, plain, and free of shadows. Use a neutral
              expression with eyes clearly visible
            </p>
          </div>
        </li>
        <li>
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
        <li>
          <div className="img">
            <span>
              <NextImage
                src="/images/steps/step-02-02-v2.png"
                layout="fill"
                alt=""
              />
            </span>
          </div>
          <div className="text">
            <p>
              No uniforms, hats, beanies or other head coverings are allowed,
              unless it&apos;s for religious reasons
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
)
export default PhotoStepInfo
