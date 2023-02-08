import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PrismicRichText } from '@prismicio/react'

import { PhotoProps } from 'slices/proceed_to_checkout'

const PhotoHeader: React.FC<PhotoProps> = ({ page }) => (
  <header>
    <div className="steps-header">
      <div className="container">
        <div className="toolbar">
          <div className="left-side">
            <div className="logo">
              <Link href={'/'}>
                <a>
                  <Image
                    src="/images/new-logo.svg"
                    alt=""
                    width={450}
                    height={141}
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="right-side">
            <div className="steps-advantages">
              <ul>
                {page.data.steps_advantages.map((step: any, index: number) => (
                  <li key={index}>
                    <span className={step.icon_class[0].text} />
                    <PrismicRichText field={step.text} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
)

export default PhotoHeader
