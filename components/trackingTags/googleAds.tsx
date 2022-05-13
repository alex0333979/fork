import React from 'react'
import Script from 'next/script'

const GoogledAdsScript = () => (
  <>
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=AW-435888795"
      strategy="afterInteractive"
    />
    <Script id="google-analytics1" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'AW-435888795');
      `}
    </Script>
  </>
)

export default GoogledAdsScript
