import sm from './sm.json'

const API_ENDPOINT = sm.apiEndpoint
const siteUrl = sm.hostName

const SITE_URL = process.env.VERCEL_ENV

const linkResolver = (doc: any) => {
  const prefix = doc.lang !== 'en-za' ? `/${doc.lang}` : ''

  switch (doc.type) {
    case 'homepage':
    case 'pricing':
    case 'page':
      return `${prefix}/${doc.uid ? doc.uid : ''}`

    case 'post':
      return `${prefix}/blog/${doc.uid}`

    case 'legal':
      return `${prefix}/legal/${doc.uid}`

    case 'product':
      return `${prefix}/product/${doc.uid}`

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
    page: { changefreq: 'monthly', priority: 1 },
    // homepage: { changefreq: "monthly", priority: 1 }, Homepage would default to this as it isn't found
    // legal: { changefreq: "monthly", priority: 1 }, Legal types would default to this as it isn't found
    post: { changefreq: 'weekly', priority: 0.8 },
    pricing: { changefreq: 'monthly', priority: 1 },
  },
  documentTypes: ['homepage', 'page', 'pricing', 'legal'],
})

module.exports = withPrismicSitemap({
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
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
