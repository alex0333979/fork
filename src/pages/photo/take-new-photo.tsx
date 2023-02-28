import React, { useContext } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { createClient } from 'prismicio'
import { ApolloQueryResult } from '@apollo/client'

import { FormsDocument, FormsQuery } from '@/apollo'
import { initializeApollo } from '@/apollo/client'
import PhotoLayout from '@/components/layout/photoLayout'
import TakeNewPhoto from '@/modules/photo/takeNewPhoto'
import { PAGES, PHOTO_FORM, SEO } from '@/constants'
import { PrismicDocument } from '@prismicio/types'
import { PageTypeHashes, PageUIDHashes } from '@/constants/PageUIDHashes'
import { PrismicContext } from '@/contexts'

interface TakeNewPhotoPageProps {
  page: PrismicDocument<Record<string, any>, string, string>
}

const TakeNewPhotoPage: React.FC<TakeNewPhotoPageProps> = ({ page }) => {
  const { setPageData } = useContext(PrismicContext)
  setPageData(page)
  return (
    <>
      <NextSeo
        title={SEO.selectType.title}
        description={SEO.selectType.description}
      />
      <PhotoLayout page={page}>
        <TakeNewPhoto page={page} />
      </PhotoLayout>
    </>
  )
}

export default TakeNewPhotoPage

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const redirectTo = (page: string = PAGES.home) => ({
    redirect: {
      destination: page,
      permanent: false,
    },
  })

  const previewData = context.previewData
  const client = createClient({ previewData })
  const locale = context?.locale as string

  const page = await client.getByUID(
    PageTypeHashes.processPage,
    PageUIDHashes.processPage,
    { lang: locale },
  )

  const articlePage = await client.getByUID(PageUIDHashes.articlePage, 'test')

  if (context.res) {
    context.res.setHeader('Cache-Control', 'no-store')
  }

  try {
    const client = initializeApollo(null, context)

    const result: ApolloQueryResult<FormsQuery> = await client.query({
      query: FormsDocument,
    })
    const form = (result.data?.Forms || []).find((f) => f.name === PHOTO_FORM)

    if (!form) return redirectTo()

    return {
      props: {
        form,
        entry: null,
        page,
        articlePage,
      },
    }
  } catch (e) {
    return redirectTo(PAGES.photo.takePhoto)
  }
}
