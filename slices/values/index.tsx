import React from 'react'
import Image from 'next/image'
import { PrismicRichText } from '@prismicio/react'

import { SliceProps } from '@/modules/about'
import { imageLoader } from '@/modules/about/summary'

const AboutUs: React.FC<SliceProps> = ({ slice }) => (
  <div className="about-values">
    <span className="bg-gradient" />
    <div className="container">
      <div className="title">
        <PrismicRichText field={slice.primary.values_title} />
      </div>
      <div className="row">
        <div className="col-12 col-lg-3">
          <div className="text">
            <PrismicRichText field={slice.primary.values_sub_title} />
            <PrismicRichText field={slice.primary.values_sub_text} />
          </div>
        </div>
        <div className="col-12 col-lg-9">
          <div className="list">
            <ul>
              {slice.items.map((item: any, index: number) => (
                <li key={index}>
                  <div className="icon">
                    <Image
                      src={item.url}
                      width={item.width}
                      height={item.height}
                      loader={imageLoader}
                      alt=""
                    />
                  </div>
                  <h4>{item.values_list_title[0].text}</h4>
                  <p>{item.values_list_text[0].text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
)
export default AboutUs
