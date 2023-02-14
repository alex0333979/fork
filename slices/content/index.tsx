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
    <div className="text">
      <PrismicRichText field={slice.primary.text} />
      <blockquote>
        <p>
          <i>
            But when we get passport photos. The only thing which is very
            unacceptable is the pricing. To resolve this and to minimize the
            cost of getting those passport photos, We have come up with a guide
            on how to take passport photo with iPhone?
          </i>
        </p>
      </blockquote>
      <p>
        A Passport photo can be necessary for anyone in many situations when
        applying or renewing a passport, visa for a country.
        <br />
        But when we get passport photos. The only thing which is very
        unacceptable is the pricing.
        <br />
        To resolve this and to minimize the cost of getting those passport
        photos, We have come up with a guide on “how to take passport photo with
        iPhone?” That’ll help you to make the perfect passport photo for you.
        <br />
        In this article, we are going you on everything from passport photo
        requirements to even guide you step by step on how to make those
        passport photos. A Passport photo can be necessary for anyone in many
        situations when applying or renewing a passport, visa for a country.
      </p>
    </div>
  </div>
)

export default Content
