import { useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { loadIntercom } = require('next-intercom')

const IntercomScript = () => {
  useEffect(() => {
    loadIntercom({
      appId: 'p554wx3p',
      ssr: false,
      initWindow: true,
      delay: 0,
    })
  }, [])

  return null
}

export default IntercomScript
