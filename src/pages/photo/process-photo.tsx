import React from 'react'
import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { FACING_MODES } from 'react-html5-camera-photo'
import { ApolloQueryResult } from '@apollo/client'

import PhotoLayout from '@/components/layout/photoLayout'
import ProcessPhoto from '@/modules/photo/processPhoto'

import { initializeApollo } from '@/apollo/client'
import {
  DocumentDocument,
  DocumentQuery,
  Entry,
  EntryDocument,
  EntryQuery,
  PDocument,
} from '@/apollo'
import {
  PAGES,
  PHOTO_FORM,
  SEO,
  TOKEN_EXPIRE_IN,
  COOKIES_TOKEN_NAME,
} from '@/constants'

export interface ProcessPhotoProps {
  entry: Entry
  type: string
  document: PDocument
}

const ProcessPhotoPage: NextPage<ProcessPhotoProps> = ({
  entry,
  type,
  document,
}) => (
  <>
    <NextSeo
      title={SEO.processPhoto.title}
      description={SEO.processPhoto.description}
    />
    <PhotoLayout>
      <ProcessPhoto entry={entry} type={type} document={document} />
    </PhotoLayout>
  </>
)

export default ProcessPhotoPage

export const getServerSideProps: GetServerSideProps<ProcessPhotoProps> = async (
  context: GetServerSidePropsContext,
) => {
  if (context.res) {
    context.res.setHeader('Cache-Control', 'no-store')
  }
  const token = context?.query.token as string
  if (token && context.res) {
    context.res.setHeader(
      'set-cookie',
      `${COOKIES_TOKEN_NAME}=${token}; Max-Age=${TOKEN_EXPIRE_IN}`,
    )
  }
  try {
    const client = initializeApollo(null, context)
    const entryId = context?.query?.entryId as string
    const type = context?.query.type as string
    const documentId = context?.query?.documentId as string
    if (!entryId || !documentId) {
      return {
        redirect: {
          destination: PAGES.photo.takePhoto,
          permanent: false,
        },
      }
    }
    const documentResult: ApolloQueryResult<DocumentQuery> = await client.query(
      {
        query: DocumentDocument,
        variables: { id: documentId },
        fetchPolicy: 'no-cache',
      },
    )
    const document = documentResult.data?.Document.data
    if (!document) {
      return {
        redirect: {
          destination: PAGES.photo.takePhoto,
          permanent: false,
        },
      }
    }
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
          document,
        },
      }
    }

    return {
      redirect: {
        destination: PAGES.photo.takePhoto,
        permanent: false,
      },
    }
  } catch (e) {
    return {
      redirect: {
        destination: PAGES.photo.takePhoto,
        permanent: false,
      },
    }
  }
}
