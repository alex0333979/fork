import React, { useContext } from 'react'
import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { ApolloQueryResult } from '@apollo/client'
import { createClient } from 'prismicio'

import PhotoLayout from '@/components/layout/photoLayout'
import TakePhoto from '@/modules/photo/takePhoto'

import {
  Entry,
  EntryDocument,
  EntryQuery,
  Form,
  FormsDocument,
  FormsQuery,
} from '@/apollo'
import { initializeApollo } from '@/apollo/client'
import { PAGES, PHOTO_FORM, SEO } from '@/constants'
import { PrismicDocument } from '@prismicio/types'
import { PageTypeHashes, PageUIDHashes } from '@/constants/PageUIDHashes'
import { PrismicContext } from '@/contexts'

export interface TakePhotoPageProps {
  form: Form
  entry: Entry | null
  documentId: string
  page: PrismicDocument<Record<string, any>, string, string>
}

const TakePhotoPage: NextPage<TakePhotoPageProps> = ({
  form,
  entry,
  documentId,
  page,
}) => {
  const { setPageData } = useContext(PrismicContext)
  setPageData(page)
  console.error('here: >>>', page)

  return (
    <>
      <NextSeo
        title={SEO.selectType.title}
        description={SEO.selectType.description}
      />
      <PhotoLayout>
        <TakePhoto
          form={form}
          entry={entry}
          documentId={documentId}
          page={page}
        />
      </PhotoLayout>
    </>
  )
}

export default TakePhotoPage

export const getServerSideProps: GetServerSideProps<
  TakePhotoPageProps
> = async (context: GetServerSidePropsContext) => {
  const redirectTo = (page: string = PAGES.home) => ({
    redirect: {
      destination: page,
      permanent: false,
    },
  })

  const previewData = context.params?.previewData
  const client = createClient({ previewData })

  const page = await client.getByUID(
    PageTypeHashes.process_page,
    PageUIDHashes.processPage,
  )

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
          page,
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
            page,
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
        page,
      },
    }
  } catch (e) {
    return redirectTo(PAGES.photo.takePhoto)
  }
}
