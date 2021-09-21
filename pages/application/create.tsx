import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { initializeApollo } from '@/lib/apolloClient';
import { ApolloQueryResult } from '@apollo/client';
import { FormsDocument, FormsQuery } from '@/generated/graphql';
import { EntryPageProps } from '@/pages/application/index';

export { default } from './index';

export const getServerSideProps: GetServerSideProps<EntryPageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const client = initializeApollo(null, context);

    const result: ApolloQueryResult<FormsQuery> = await client.query({
      query: FormsDocument
    });
    const forms = result.data?.Forms || [];

    if (forms.length === 0) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }

    const formId = context?.query?.formId as string;
    const form = forms.find((f) => f.id === formId);
    return {
      props: {
        forms,
        entry: {
          id: null,
          currentStep: 1,
          form: form ?? forms[0],
          formId: form ? form.id : forms[0].id
        },
        step: 1
      }
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
};
