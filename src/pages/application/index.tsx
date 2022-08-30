import React from 'react'
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'

import { ApolloQueryResult } from '@apollo/client'

import { AppLayout } from '@/components/index'
import { initializeApollo } from '@/apollo/client'
import {
  CartDocument,
  CartQuery,
  Form,
  FormsDocument,
  FormsQuery,
} from '@/apollo'
import { PAGES, SEO, TOKEN_EXPIRE_IN, COOKIES_TOKEN_NAME } from '@/constants'

const ApplicationForm = dynamic(
  () => import('@/modules/application/applicationForm'),
)

export interface EntryPageProps {
  forms: Form[]
  entry: {
    id: string | null
    currentStep: number
    completeStep: number
    form: Form
    formId: string
  }
  step: number
}

const Entry: NextPage<EntryPageProps> = ({ forms, entry, step }) => (
  <>
    <NextSeo
      title={SEO.passportApplication.title}
      description={SEO.passportApplication.description}
    />
    <AppLayout>
      <ApplicationForm forms={forms} entry={entry} step={step} />
    </AppLayout>
  </>
)

export const getServerSideProps: GetServerSideProps<EntryPageProps> = async (
  context: GetServerSidePropsContext,
) => {
  const token = context?.query.token as string
  if (token && context.res) {
    context.res.setHeader(
      'set-cookie',
      `${COOKIES_TOKEN_NAME}=${token}; Max-Age=${TOKEN_EXPIRE_IN}`,
    )
  }

  try {
    const client = initializeApollo(null, context)

    const formRes: ApolloQueryResult<FormsQuery> = await client.query({
      query: FormsDocument,
    })
    const forms = formRes.data?.Forms || []

    if (forms.length === 0) {
      return {
        redirect: {
          destination: PAGES.home,
          permanent: false,
        },
      }
    }

    const cartRes: ApolloQueryResult<CartQuery> = await client.query({
      query: CartDocument,
    })
    const cart = cartRes.data.Cart.data
    const items = cart?.items ?? []
    if (items.length > 0) {
      const lastEntry = items[items.length - 1].productId
      return {
        redirect: {
          destination: `${PAGES.application.index}${lastEntry}/`,
          permanent: false,
        },
      }
    }
    return {
      redirect: {
        destination: PAGES.application.create,
        permanent: false,
      },
    }
  } catch (e) {
    return {
      redirect: {
        destination: PAGES.application.index,
        permanent: false,
      },
    }
  }
}

export default Entry
