import React from 'react'
import Image from 'next/image'
import { PrismicRichText } from '@prismicio/react'

import { SliceProps } from '@/modules/about'
import { imageLoader } from '@/modules/about/summary'

const Info: React.FC<SliceProps> = ({ slice }) => (
  <div className="about-info">
    <div className="container">
      <div className="row align-items-lg-center">
        <div className="col-12 col-lg-6">
          <div className="img">
            <Image
              src={slice.items[0].info_image.url}
              width={slice.items[0].info_image.dimensions.width}
              height={slice.items[0].info_image.dimensions.height}
              loader={imageLoader}
              layout="fill"
              alt=""
            />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="text prismic-content">
            <PrismicRichText field={slice.items[0].info_title} />
            <PrismicRichText field={slice.items[0].info_text} />
          </div>
        </div>
      </div>
    </div>
  </div>
)
export default Info
