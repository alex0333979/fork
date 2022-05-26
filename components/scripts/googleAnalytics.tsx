import React from 'react'
import Script from 'next/script'

const GoogledAnalyticsScript = () => (
  <>
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=UA-180463623-1"
      strategy="afterInteractive"
    />
    <Script id="google-analytics2" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-180463623-1');
      `}
    </Script>
  </>
)

export default GoogledAnalyticsScript
