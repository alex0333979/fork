/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./next.config')
const sm = require('./sm.json')

const PageTypeHashes = {
  landingPage: 'landing_page',
  contactUs: 'contact_us',
  processPage: 'process_page',
  checkoutPage: 'checkout',
  articlePage: 'article',
  aboutPage: 'about',
  oneClick: 'one_click',
  shippingPolicy: 'shipping_policy',
  terms: 'terms',
}

const API_ENDPOINT = sm.apiEndpoint
const SITE_URL = 'https://www.passportphotos.com'
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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPrismicSitemap = require('@reecem/prismic-sitemap')({
  linkResolver,
  apiEndpoint: API_ENDPOINT,
  hostname: SITE_URL,
  optionsMapPerDocumentType: {
    ...Object.values(PageTypeHashes).map((f) => ({
      [f]: { changefreq: 'monthly', priority: 1 },
    })),
  },
  documentTypes: [Object.values(PageTypeHashes)],
})

module.exports = withPrismicSitemap({
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  alternateRefs: [
    {
      href: process.env.FRONTEND_URL,
      hreflang: 'x-default',
    },
    ...config.i18n.locales.map((l) => ({
      href: process.env.FRONTEND_URL,
      hreflang: l,
    })),
  ],
  robotsTxtOptions: {
    additionalSitemaps: [`${SITE_URL}/server-sitemap.xml`],
    policies: [
      {
        userAgent: '*',
        disallow: '/cart',
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  exclude: ['/cart'],
})
