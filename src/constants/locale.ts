import * as prismic from '@prismicio/client'

import sm from '../../sm.json'

/**
 * @returns {import('next').NextConfig}
 */

const locale = async () => {
  const client = prismic.createClient(sm.apiEndpoint)

  const repository = await client.getRepository()
  const locales = repository.languages.map((lang: any) => lang.id)

  return {
    i18n: {
      locales,
      defaultLocale: locales[0],
    },
  }
}

export default locale
