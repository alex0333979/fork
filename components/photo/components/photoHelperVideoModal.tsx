import React, { useState } from 'react'
import ModalContainer from '@/components/elements/modalContainer'

const PhotoHelper: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className="info-link" onClick={() => setOpen(true)}>
        <span>{'How to take a photo'}</span>
      </div>
      {open && (
        <ModalContainer open closeModal={() => setOpen(false)}>
          <div itemScope itemType="https://schema.org/VideoObject">
            <meta
              itemProp="uploadDate"
              content="Mon May 09 2022 11:33:55 GMT-0400 (Eastern Daylight Time)"
            />
            <meta
              itemProp="name"
              content="Video 1 How To Take A Photo With Logo2wm (1)"
            />
            <meta itemProp="duration" content="P0Y0M0DT0H1M0S" />
            <meta
              itemProp="thumbnailUrl"
              content="https://content.jwplatform.com/thumbs/V7fgNsUc-1920.jpg"
            />
            <meta
              itemProp="contentUrl"
              content="https://content.jwplatform.com/videos/V7fgNsUc-dEtS4zpu.mp4"
            />
            <script src="https://cdn.jwplayer.com/players/V7fgNsUc-7AicWhmk.js" />
          </div>
        </ModalContainer>
      )}
    </>
  )
}

export default PhotoHelper
