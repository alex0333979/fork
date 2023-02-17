import React from 'react'
import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { FACING_MODES } from 'react-html5-camera-photo'
import { ApolloQueryResult } from '@apollo/client'
import { PrismicDocument } from '@prismicio/types'
import { createClient } from 'prismicio'

import { initializeApollo } from '@/apollo/client'
import { EntryDocument, EntryQuery, Entry } from '@/apollo'
import PhotoLayout from '@/components/layout/photoLayout'
import EditPhoto from '@/modules/photo/editPhoto'

import { PAGES, SEO, PHOTO_FORM } from '@/constants'
import { PageTypeHashes, PageUIDHashes } from '@/constants/PageUIDHashes'
import { withLocale } from '@/hocs'

export interface EditPhotoProps {
  accessToken?: string
  entry?: Entry
  type?: string
  page?: PrismicDocument<Record<string, any>, string, string>
  locale?: string
}

const EditPhotoPage: NextPage<EditPhotoProps> = ({
  accessToken,
  entry,
  type,
  page,
}) => (
  <>
    <NextSeo
      title={SEO.editPhoto.title}
      description={SEO.editPhoto.description}
    />
    <PhotoLayout page={page}>
      <EditPhoto accessToken={accessToken} entry={entry} type={type} />
    </PhotoLayout>
  </>
)
export default withLocale(EditPhotoPage)

export const getServerSideProps: GetServerSideProps<EditPhotoProps> = async (
  context: GetServerSidePropsContext,
) => {
  if (context.res) {
    context.res.setHeader('Cache-Control', 'no-store')
    // context.res.setHeader('Set-Cookie', [`${COOKIES_TOKEN_NAME}=deleted; Max-Age=0`]);
  }

  const previewData = context.previewData
  const client = createClient({ previewData })
  const page = await client.getByUID(
    PageTypeHashes.process_page,
    PageUIDHashes.processPage,
  )

  const accessToken = context?.query?.accessToken as string
  const entryId = context?.query?.entryId as string
  const type = context?.query?.type as string

  if (!entryId && !accessToken) {
    return {
      redirect: {
        destination: PAGES.home,
        permanent: false,
      },
    }
  }

  if (entryId) {
    const client = initializeApollo(null, context)
    const entryResult: ApolloQueryResult<EntryQuery> = await client.query({
      query: EntryDocument,
      variables: { entryId },
      fetchPolicy: 'no-cache',
    })
    const entry = entryResult.data?.Entry?.data
    if (entry && entry.form.name === PHOTO_FORM) {
      return {
        props: {
          page,
          entry,
          type:
            type === FACING_MODES.ENVIRONMENT
              ? FACING_MODES.ENVIRONMENT
              : FACING_MODES.USER,
        },
      }
    }
    return {
      redirect: {
        destination: PAGES.photo.takeNewPhoto,
        permanent: false,
      },
    }
  }

  return {
    props: {
      accessToken,
      page,
    },
  }
}
