import React, { useMemo, useState } from 'react'
import { YouTubePlayer } from 'react-youtube'
// import { PrismicRichText } from '@prismicio/react'

import ModalContainer from '@/components/elements/modalContainer'
// import { ArticlePageProps } from '../takeNewPhoto'

const videoRatio = 0.5625

const PhotoHelper: React.FC /* <ArticlePageProps>*/ =
  (/* { articlePage }*/) => {
    const [open, setOpen] = useState<boolean>(false)

    const [vWidth, vHeight] = useMemo(() => {
      if (typeof window !== 'undefined') {
        const { innerWidth } = window

        const _vWidth = Math.round(Math.min(0.9 * innerWidth, 640))
        const _vHeight = videoRatio * _vWidth

        return [_vWidth, _vHeight]
      }

      return [640, 360]
    }, [])

    return (
      <>
        <div className="info-link" onClick={() => setOpen(true)}>
          <span>How to take a photo</span>
        </div>
        <ModalContainer open={open} closeModal={() => setOpen(false)}>
          <div style={{ width: vWidth, height: vHeight }}>
            <YouTubePlayer
              videoId="niyaWETsrUI"
              opts={{
                width: `${vWidth}`,
                height: `${vHeight}`,
              }}
            />
            {/* <PrismicRichText field={articlePage?.data.slices[0].primary.text} /> */}
          </div>
        </ModalContainer>
      </>
    )
  }

export default PhotoHelper
