import React, { useMemo } from 'react'
import Image from 'next/image'
import { PrismicRichText } from '@prismicio/react'

import { imageLoader } from '@/modules/about/summary'

interface RequirementsProps {
  slice?: any
  context?: any
}

const RequirementBox: React.FC<RequirementsProps> = ({ slice, context }) => {
  const countryName = useMemo(() => {
    if (!context.country) return ''
    if (context.country.countryCode?.toLowerCase() === 'us') {
      return 'United States'
    }
    if (context.country.countryCode?.toLowerCase() === 'gb') return 'UK'

    return context.country.country || ''
  }, [context.country])

  return (
    <div className="requirements-box">
      <div className="container">
        <div className="data-wrap">
          <div className="sub-title">
            <h2>{`${countryName} ${context.document.type} Photo - Biometric Requirements`}</h2>
          </div>
          <div className="info-box">
            <div className="example-list">
              <ul>
                {slice.items.map((item: any, index: number) => (
                  <li key={index}>
                    <div className="icon-wrap">
                      <span>
                        <Image
                          src={item.list_icon.url}
                          width={item.list_icon.dimensions?.width}
                          height={item.list_icon.dimensions?.height}
                          loader={imageLoader}
                          layout="fill"
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="text-wrap prismic-content">
                      <PrismicRichText field={item.list_title} />
                      <PrismicRichText field={item.list_text} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="example-box">
              <div className="top-space">
                <p>{`${context.document.head?.position?.min ?? ''}`}</p>
              </div>
              <div className="face-space">
                <p>
                  <span>{slice.primary.image_face_space[0].text}</span>
                </p>
              </div>
              <div className="height-info">
                <p>
                  <span>{slice.primary.image_height[0].text}</span>
                </p>
              </div>
              <div className="width-info">
                <p>
                  <span>{slice.primary.image_width[0].text}</span>
                </p>
              </div>
              <div className="img-wrap">
                <span>
                  <Image
                    src={slice.primary.requirements_image.url}
                    width={slice.primary.requirements_image.dimensions.width}
                    height={slice.primary.requirements_image.dimensions.height}
                    loader={imageLoader}
                    layout="fill"
                    alt=""
                  />
                </span>
                <p>{slice.primary.image_dpi[0].text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequirementBox
