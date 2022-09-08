import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ApolloQueryResult } from '@apollo/client'

import { initializeApollo } from '@/apollo/client'
import { FormsDocument, FormsQuery } from '@/apollo'
import { PAGES, PHOTO_FORM } from '@/constants'
import { EntryPageProps } from '.'

export { default } from './index'

export const getServerSideProps: GetServerSideProps<EntryPageProps> = async (
  context: GetServerSidePropsContext,
) => {
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

    const formId = context?.query?.formId as string
    const type = context?.query.t as string

    const applicationForms = forms.filter((f) => f.name !== PHOTO_FORM)
    const form = applicationForms.find(
      (f) => f.id === formId || f.name.toLowerCase() === type,
    )

    return {
      props: {
        forms: applicationForms,
        entry: {
          id: null,
          completeStep: 0,
          currentStep: 1,
          form: form ?? applicationForms[0],
          formId: form ? form.id : applicationForms[0].id,
        },
        step: 1,
      },
    }
  } catch (e) {
    return {
      redirect: {
        destination: PAGES.home,
        permanent: false,
      },
    }
  }
}
