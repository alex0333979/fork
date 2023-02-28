import sm from './sm.json'

const API_ENDPOINT = sm.apiEndpoint
const SITE_URL = sm.hostName
const locales = ['en-us', 'en-gb', 'de-de', 'es-es', 'fr-fr', 'it-it']

const linkResolver = (doc) => {
  const prefix = locales.includes(doc.lang, 0) ? `/${doc.lang}` : ''

  switch (doc.type) {
    // case 'homepage':
    // case 'pricing':
    // case 'page':
    //   return `${prefix}/${doc.uid ? doc.uid : ''}`

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
  SITE_URL,
  generateRobotsTxt: true,
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
