/* eslint-disable max-len */
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import WoopraTracker from '@animalresearch/woopra-react'

const WoopraScript: React.FC = () => (
  <>
    <WoopraTracker
      config={{
        domain: 'passportphotos.com',
        outgoing_tracking: true,
        download_tracking: true,
        click_tracking: true,
      }}
    />
  </>
)

export default WoopraScript
