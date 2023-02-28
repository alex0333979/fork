import { GetServerSideProps } from 'next'
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { documents, AvailablePath } from '@/constants'

import config from '@/../next.config'

const frontendUrl = 'https://www.passportphotos.com'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields: ISitemapField[] = []

  documents.forEach((d) => {
    const countryName = d.country.toLowerCase().replace(/\s/g, '-')
    const documentType = d.type
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s/g, '-')

    fields.push({
      loc: `${frontendUrl}/${countryName}/${documentType}`,
      changefreq: `daily`,
      priority: 0.7,
      lastmod: new Date().toISOString(),
    })
  })

  Object.entries(AvailablePath).forEach(([country, docTypes]) => {
    Object.entries(docTypes).forEach(([docType, paths]) => {
      paths.forEach((path) => {
        fields.push({
          loc: `${frontendUrl}/${country}/${docType}/${path}`,
          changefreq: `daily`,
          priority: 0.7,
          lastmod: new Date().toISOString(),
        })
      })
    })
  })

  const localeFields: ISitemapField[] = []
  fields.forEach((f) => {
    config.i18n.locales.forEach((l) => {
      localeFields.push({
        ...f,
        loc: f.loc.replace(frontendUrl, `${frontendUrl}/${l}`),
      })
    })
  })

  return getServerSideSitemap(ctx, [...fields, ...localeFields])
}

export default function Site() {}
