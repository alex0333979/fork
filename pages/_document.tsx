/* eslint-disable @next/next/no-document-import-in-page */
/* eslint-disable max-len */
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'

import WoopraScript from '@/components/trackingTags/woopra'
import MicrosoftUETScript from '@/components/trackingTags/msUet'
import OribiAlternativeScript from '@/components/trackingTags/oribiAlternative'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang={'en'}>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="format-detection" content="address=no" />

          <link
            rel="apple-touch-icon-precomposed"
            sizes="57x57"
            href={'/images/favicon/apple-touch-icon-57x57.png'}
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="114x114"
            href={'/images/favicon/apple-touch-icon-114x114.png'}
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="72x72"
            href={'/images/favicon/apple-touch-icon-72x72.png'}
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="144x144"
            href={'/images/favicon/apple-touch-icon-144x144.png'}
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="60x60"
            href={'/images/favicon/apple-touch-icon-60x60.png'}
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="120x120"
            href={'/images/favicon/apple-touch-icon-120x120.png'}
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="76x76"
            href={'/images/favicon/apple-touch-icon-76x76.png'}
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="152x152"
            href={'/images/favicon/apple-touch-icon-152x152.png'}
          />
          <link
            rel="icon"
            type="image/png"
            href={'/images/favicon/favicon-196x196.png'}
            sizes="196x196"
          />
          <link
            rel="icon"
            type="image/png"
            href={'/images/favicon/favicon-96x96.png'}
            sizes="96x96"
          />
          <link
            rel="icon"
            type="image/png"
            href={'/images/favicon/favicon-32x32.png'}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={'/images/favicon/favicon-16x16.png'}
            sizes="16x16"
          />
          <link
            rel="icon"
            type="image/png"
            href={'/images/favicon/favicon-128.png'}
            sizes="128x128"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/css/flag-icon.min.css"
            rel="stylesheet"
          />
          <meta name="application-name" content="&nbsp;" />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="msapplication-TileImage" content="mstile-144x144.png" />
          <meta
            name="msapplication-square70x70logo"
            content="mstile-70x70.png"
          />
          <meta
            name="msapplication-square150x150logo"
            content="mstile-150x150.png"
          />
          <meta
            name="msapplication-wide310x150logo"
            content="mstile-310x150.png"
          />
          <meta
            name="msapplication-square310x310logo"
            content="mstile-310x310.png"
          />

          <meta property="og:site_name" content="Passport Photos" />
          <meta property="og:url" content="https://PassportPhotos.com" />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content={`Take Your Own Passport Photo From Anywhere - 
            Use Your Cellphone and Get Instant Compliance and Verification`}
          />
          <meta property="og:image" content="template.png" />
          <meta property="og:locale" content="us_EN" />
          {/* Microsoft UET tag */}
          <MicrosoftUETScript />
          <OribiAlternativeScript />
        </Head>
        <body>
          <Main />
          <NextScript />
          <WoopraScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
