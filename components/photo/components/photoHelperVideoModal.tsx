import React, { useState } from 'react'
import YoutubePlayer from 'react-youtube'

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
          <YoutubePlayer
            videoId="niyaWETsrUI"
            opts={{
              width: '640',
              height: '360',
            }}
          />
        </ModalContainer>
      )}
    </>
  )
}

export default PhotoHelper
