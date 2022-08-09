import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import { ProcessingStatus } from '../types'

interface Props {
  status: ProcessingStatus
  openInfo: boolean
  onOpenInfo: (v: boolean) => void
}

const StepInfo: React.FC<Props> = ({ status, openInfo, onOpenInfo }) => (
  <div className={classNames('step-info', { open: openInfo })}>
    <div className="info-toolbar">
      <p>
        <span className="icon-info" />
      </p>
      <button type="button" onClick={() => onOpenInfo(false)}>
        <span className="icon-close" />
      </button>
    </div>
    {status === ProcessingStatus.loading ? (
      <div className="instruction-list">
        <ul>
          <li>
            <div className="img">
              <span>
                <Image
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
                <Image
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
                <Image
                  src="/images/steps/step-02-02-v2.png"
                  layout="fill"
                  alt=""
                />
              </span>
            </div>
            <div className="text">
              <p>
                {`No uniforms, hats, beanies or other head coverings are allowed, unless it's for
                  religious reasons`}
              </p>
            </div>
          </li>
        </ul>
      </div>
    ) : (
      <div className="info-text">
        <div className="info-wrap">
          <div className="img">
            {status === ProcessingStatus.failed ? (
              <Image
                src="/images/steps/step-03-00.png"
                width={340}
                height={326}
                alt=""
              />
            ) : (
              <Image
                src="/images/steps/step-03-01.png"
                width={392}
                height={299}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    )}
  </div>
)

export default StepInfo
