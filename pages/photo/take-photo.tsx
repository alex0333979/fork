import type { NextPage } from 'next'
import PhotoLayout from '@/components/layout/photoLayout'
import TakePhoto from '@/components/photo/takePhoto'
import React from 'react'
import { NextSeo } from 'next-seo'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ApolloQueryResult } from '@apollo/client'

import {
  Entry,
  EntryDocument,
  EntryQuery,
  Form,
  FormsDocument,
  FormsQuery,
} from '@/generated/graphql'
import { initializeApollo } from '@/lib/apolloClient'
import { PAGES, PHOTO_FORM, SEO } from '../../constants'

export interface TakePhotoPageProps {
  form: Form
  entry: Entry | null
  documentId: string
}

const TakePhotoPage: NextPage<TakePhotoPageProps> = ({
  form,
  entry,
  documentId,
}) => (
  <>
    <NextSeo
      title={SEO.selectType.title}
      description={SEO.selectType.description}
    />
    <PhotoLayout>
      <TakePhoto form={form} entry={entry} documentId={documentId} />
    </PhotoLayout>
  </>
)

export default TakePhotoPage

export const getServerSideProps: GetServerSideProps<TakePhotoPageProps> =
  async (context: GetServerSidePropsContext) => {
    const redirectTo = (page: string = PAGES.home) => ({
      redirect: {
        destination: page,
        permanent: false,
      },
    })

    if (context.res) {
      context.res.setHeader('Cache-Control', 'no-store')
    }

    const entryId = context?.query?.entryId as string
    const documentId = context?.query?.documentId as string
    if (!documentId && !entryId) {
      return redirectTo()
    }
    try {
      const client = initializeApollo(null, context)

      const result: ApolloQueryResult<FormsQuery> = await client.query({
        query: FormsDocument,
      })
      const form = (result.data?.Forms || []).find((f) => f.name === PHOTO_FORM)

      if (!form) return redirectTo()

      if (!entryId) {
        return {
          props: {
            form,
            entry: null,
            documentId,
          },
        }
      }
      const entryResult: ApolloQueryResult<EntryQuery> = await client.query({
        query: EntryDocument,
        variables: { entryId },
        fetchPolicy: 'no-cache',
      })
      const entry = entryResult.data?.Entry.data
      if (!entry) {
        if (documentId) {
          return {
            props: {
              form,
              entry: null,
              documentId,
            },
          }
        }
        return redirectTo()
      }
      const docId = entry.form.steps[0].fields.find(
        (f) => f.name === 'document_id',
      )?.value as string
      if (documentId !== docId.toString()) {
        return redirectTo(
          `${PAGES.photo.takePhoto}?entryId=${entryId}&documentId=${docId}`,
        )
      }

      return {
        props: {
          form,
          entry,
          documentId,
        },
      }
    } catch (e) {
      return redirectTo(PAGES.photo.takePhoto)
    }
  }
