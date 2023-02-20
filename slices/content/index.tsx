import React from 'react'
import Image from 'next/image'
import { PrismicRichText } from '@prismicio/react'

import { SliceProps } from '@/modules/about'
import { imageLoader } from '@/modules/about/summary'

const Content: React.FC<SliceProps> = ({ slice, context }) => (
  <div className="article-content">
    <div className="img">
      <Image
        src={context?.page?.data.cover_image.url}
        width={context?.page?.data.cover_image.dimensions.width}
        height={context?.page?.data.cover_image.dimensions.height}
        loader={imageLoader}
        alt=""
      />
    </div>
    <div className="text prismic-content">
      <PrismicRichText field={slice.primary.text} />
      <blockquote>
        <p>
          <i className="prismic-content">
            <PrismicRichText
              field={context?.page?.data.slices[1].primary.blockquote}
            />
          </i>
        </p>
      </blockquote>
      <PrismicRichText field={context?.page?.data.slices[2].primary.text} />
    </div>
  </div>
)
export default Content
