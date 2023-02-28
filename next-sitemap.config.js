import sm from './sm.json'

const API_ENDPOINT = sm.apiEndpoint
const SITE_URL = sm.hostName
const locales = ['en-us', 'en-gb', 'de-de', 'es-es', 'fr-fr', 'it-it']

const linkResolver = (doc) => {
  const prefix = locales.includes(doc.lang, 0) ? `/${doc.lang}` : ''

  switch (doc.type) {
    case 'application':
      return `${prefix}/application/${doc.uid}`

    case 'blogs':
      return `${prefix}/blogs/${doc.uid}`

    case 'cart':
      return `${prefix}/cart/${doc.uid}`

    case 'checkout':
      return `${prefix}/checkout/${doc.uid}`

    case 'contact-us':
      return `${prefix}/contact-us/${doc.uid}`

    case 'one-click':
      return `${prefix}/one-click/${doc.uid}`

    case 'photo':
      return `${prefix}/photo/${doc.uid}`

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
    application: { changefreq: 'monthly', priority: 1 },
    blogs: { changefreq: 'monthly', priority: 1 },
    cart: { changefreq: 'monthly', priority: 1 },
    checkout: { changefreq: 'monthly', priority: 1 },
    'contact-us': { changefreq: 'monthly', priority: 1 },
    'one-click': { changefreq: 'monthly', priority: 1 },
    photo: { changefreq: 'monthly', priority: 1 },
  },
  documentTypes: [
    'application',
    'blogs',
    'cart',
    'checkout',
    'contact-us',
    'one-click',
    'photo',
  ],
})

module.exports = withPrismicSitemap({
  siteUrl: process.env.FRONTEND_URL || 'https://passportphotos.com/',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  alternateRefs: [
    {
      href: process.env.FRONTEND_URL,
      hreflang: 'x-default',
    },
    {
      href: process.env.FRONTEND_URL,
      hreflang: 'en-us',
    },
    {
      href: process.env.FRONTEND_URL,
      hreflang: 'en-gb',
    },
    {
      href: process.env.FRONTEND_URL,
      hreflang: 'de-de',
    },
    {
      href: process.env.FRONTEND_URL,
      hreflang: 'es-es',
    },
    {
      href: process.env.FRONTEND_URL,
      hreflang: 'fr-fr',
    },
    {
      href: process.env.FRONTEND_URL,
      hreflang: 'it-it',
    },
  ],
  robotsTxtOptions: {
    additionalSitemaps: [`${SITE_URL}/server-sitemap.xml`],
  },
  exclude: ['/cart'],
})
