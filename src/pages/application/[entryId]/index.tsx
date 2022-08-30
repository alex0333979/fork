import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ApolloQueryResult } from '@apollo/client'

import { initializeApollo } from '@/apollo/client'
import { EntryDocument, EntryQuery, FormsDocument, FormsQuery } from '@/apollo'
import {
  PAGES,
  PHOTO_FORM,
  TOKEN_EXPIRE_IN,
  COOKIES_TOKEN_NAME,
} from '@/constants'

import { EntryPageProps } from '../index'
export { default } from '../index'

export const getServerSideProps: GetServerSideProps<EntryPageProps> = async (
  context: GetServerSidePropsContext,
) => {
  const entryId = context?.params?.entryId as string
  const token = context?.query.token as string
  if (token && context.res) {
    context.res.setHeader(
      'set-cookie',
      `${COOKIES_TOKEN_NAME}=${token}; Max-Age=${TOKEN_EXPIRE_IN}`,
    )
  }

  try {
    const client = initializeApollo(null, context)

    const result: ApolloQueryResult<FormsQuery> = await client.query({
      query: FormsDocument,
    })
    const forms = result.data?.Forms || []

    if (forms.length === 0) {
      return {
        redirect: {
          destination: PAGES.home,
          permanent: false,
        },
      }
    }

    const entryResult: ApolloQueryResult<EntryQuery> = await client.query({
      query: EntryDocument,
      variables: { entryId },
    })
    const entry = entryResult.data?.Entry.data

    if (entry && entry.form.name !== PHOTO_FORM) {
      let nextStep = entry.completeStep + 1
      if (entry.completeStep + 1 > entry.form.steps.length) {
        nextStep = entry.completeStep
      }
      return {
        redirect: {
          destination: `${PAGES.application.index}${entryId}/${nextStep}/`,
          permanent: false,
        },
      }
    }

    return {
      redirect: {
        destination: PAGES.application.index,
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
