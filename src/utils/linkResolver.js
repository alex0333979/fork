/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('../../next.config')
const { PageTypeHashes } = require('../constants/PageUIDHashes')

const locales = config.i18n.locales

const linkResolver = (doc) => {
  const prefix = locales.includes(doc.lang, 0) ? `/${doc.lang}` : ''

  switch (doc.type) {
    case PageTypeHashes.aboutPage:
      return `${prefix}/about`

    case PageTypeHashes.application:
      return `${prefix}/application`

    case PageTypeHashes.articlePage:
      return `${prefix}/blogs/${doc.uid}`

    case PageTypeHashes.blogs:
      return `${prefix}/blogs`

    case PageTypeHashes.checkoutPage:
      return `${prefix}/checkout`

    case PageTypeHashes.contactUs:
      return `${prefix}/contact-us`

    case PageTypeHashes.oneClick:
      return `${prefix}/one-click`

    case PageTypeHashes.processPage:
      return `${prefix}/photo`

    case PageTypeHashes.shippingPolicy:
      return `${prefix}/shipping_policy`

    case PageTypeHashes.terms:
      return `${prefix}/terms`

    default:
      throw new Error(`Unknown doc.type: "${doc.type}"`)
  }
}

module.exports = { linkResolver }
