import React from 'react'
import { PrismicRichText } from '@prismicio/react'
import Image from 'next/image'

import { AboutProps } from '@/pages/about'

export const imageLoader = ({ src, width }) => `${src}&w=${width}&q=100}`

const Summary: React.FC<AboutProps> = ({ page }) => (
  <div className="about-page top-shadow">
    <span className="circle" />
    <div className="container">
      <div className="row">
        <div className="title col-12 col-lg-5">
          <PrismicRichText field={page?.data.title} />
          <div className="d-lg-none">
            <PrismicRichText field={page?.data.intro_desktop_text} />
          </div>
          <div className="d-none d-lg-block">
            <PrismicRichText field={page?.data.intro_mobile_text} />
          </div>
          <ul>
            <li className="d-lg-none">All process is safe</li>
            <li className="d-lg-none">Get approved quickly</li>
            {page?.data.title_list.map((title: any, index: number) => (
              <li className="d-none d-lg-block" key={index}>
                {title.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="img col-12 col-lg-7">
          <div className="img-wrap">
            <span>
              <Image
                src={page?.data.intro_top_image.url}
                width={page?.data.intro_top_image.dimensions.width}
                height={page?.data.intro_top_image.dimensions.height}
                loader={imageLoader}
                alt=""
              />
            </span>
            <span className="d-none d-md-flex">
              <Image
                src={page?.data.intro_bottom_image.url}
                width={page?.data.intro_bottom_image.dimensions.width}
                height={page?.data.intro_bottom_image.dimensions.height}
                loader={imageLoader}
                alt=""
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Summary
