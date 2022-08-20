import { GetServerSideProps } from 'next'
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { documents, AvailablePath } from '@/constants'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields: ISitemapField[] = []

  documents.forEach((d) => {
    const countryName = d.country.toLowerCase().replace(/\s/g, '-')
    const documentType = d.type
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s/g, '-')

    fields.push({
      loc: `https://passportphotos.com/${countryName}/${documentType}/`,
      changefreq: `daily`,
      priority: 0.7,
      lastmod: new Date().toISOString(),
    })
  })

  Object.entries(AvailablePath).forEach(([country, docTypes]) => {
    Object.entries(docTypes).forEach(([docType, paths]) => {
      paths.forEach((path) => {
        fields.push({
          loc: `https://passportphotos.com/${country}/${docType}/${path}`,
          changefreq: `daily`,
          priority: 0.7,
          lastmod: new Date().toISOString(),
        })
      })
    })
  })

  return getServerSideSitemap(ctx, fields)
}

export default function Site() {}
