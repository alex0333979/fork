import React from 'react'
import Image from 'next/image'
import { PrismicRichText } from '@prismicio/react'

import { SliceProps } from '@/modules/about'
import { imageLoader } from '@/modules/about/summary'

const Why: React.FC<SliceProps> = ({ slice }) => (
  <div className="about-why">
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="img">
            <Image
              src={slice.items[0].why_image.url}
              width={slice.items[0].why_image.dimensions.width}
              height={slice.items[0].why_image.dimensions.height}
              loader={imageLoader}
              layout="fill"
              alt=""
            />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="text">
            <PrismicRichText field={slice.items[0].why_title} />
            <PrismicRichText field={slice.items[0].why_text} />
            <ul>
              {slice.items[0].why_list.map((item: any, index: number) => (
                <li key={index}>
                  <div dangerouslySetInnerHTML={{ __html: item.text }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Why
