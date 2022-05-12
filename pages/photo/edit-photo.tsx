import React from 'react'
import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { FACING_MODES } from 'react-html5-camera-photo'
import { ApolloQueryResult } from '@apollo/client'

import PhotoLayout from '@/components/layout/photoLayout'
import { initializeApollo } from '@/lib/apolloClient'
import EditPhoto from '@/components/photo/editPhoto'
import { EntryDocument, EntryQuery, Entry } from '@/generated/graphql'

import { PAGES, SEO, PHOTO_FORM } from '../../constants'

export interface EditPhotoProps {
  accessToken?: string
  entry?: Entry
  type?: string
}

const EditPhotoPage: NextPage<EditPhotoProps> = ({
  accessToken,
  entry,
  type,
}) => (
  <>
    <NextSeo
      title={SEO.editPhoto.title}
      description={SEO.editPhoto.description}
    />
    <PhotoLayout>
      <EditPhoto accessToken={accessToken} entry={entry} type={type} />
    </PhotoLayout>
  </>
)

export default EditPhotoPage

export const getServerSideProps: GetServerSideProps<EditPhotoProps> = async (
  context: GetServerSidePropsContext,
) => {
  if (context.res) {
    context.res.setHeader('Cache-Control', 'no-store')
    // context.res.setHeader('Set-Cookie', [`${COOKIES_TOKEN_NAME}=deleted; Max-Age=0`]);
  }

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
    },
  }
}
