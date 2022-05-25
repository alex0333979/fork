import React, { useState } from 'react'

import ModalContainer from '@/components/elements/modalContainer'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: ReactJWPlayer } = require('react-jw-player')

const playlist = [
  {
    file: 'https://content.jwplatform.com/videos/V7fgNsUc-dEtS4zpu.mp4',
    image: 'https://content.jwplatform.com/thumbs/V7fgNsUc-1920.jpg',
  },
]

const PhotoHelper: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className="info-link" onClick={() => setOpen(true)}>
        <span>{'How to take a photo'}</span>
      </div>
      {open && (
        <ModalContainer open closeModal={() => setOpen(false)}>
          <ReactJWPlayer
            licenseKey=""
            playerId="V7fgNsUc-dEtS4zpu"
            playerScript="https://cdn.jwplayer.com/players/V7fgNsUc-7AicWhmk.js"
            playlist={playlist}
          />
        </ModalContainer>
      )}
    </>
  )
}

export default PhotoHelper
