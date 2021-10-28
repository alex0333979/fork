import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { initializeApollo } from '@/lib/apolloClient';
import { ApolloQueryResult } from '@apollo/client';
import { FormsDocument, FormsQuery } from '@/generated/graphql';
import { EntryPageProps } from '@/pages/application/index';
import { PAGES, PHOTO_FORM } from '../../constants';

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
          destination: PAGES.home,
          permanent: false
        }
      };
    }

    const formId = context?.query?.formId as string;
    const applicationForms = forms.filter((f) => f.name !== PHOTO_FORM);
    const form = applicationForms.find((f) => f.id === formId);
    return {
      props: {
        forms: applicationForms,
        entry: {
          id: null,
          completeStep: 0,
          currentStep: 1,
          form: form ?? applicationForms[0],
          formId: form ? form.id : applicationForms[0].id
        },
        step: 1
      }
    };
  } catch (e) {
    return {
      redirect: {
        destination: PAGES.home,
        permanent: false
      }
    };
  }
};
