/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./next.config')
const sm = require('./sm.json')
const { linkResolver } = require('./src/utils/linkResolver')
const { PageTypeHashes } = require('./src/constants/PageUIDHashes')

const API_ENDPOINT = sm.apiEndpoint
const SITE_URL = 'https://www.passportphotos.com'

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
      href: SITE_URL,
      hreflang: 'x-default',
    },
    ...config.i18n.locales.map((l) => ({
      href: SITE_URL,
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
