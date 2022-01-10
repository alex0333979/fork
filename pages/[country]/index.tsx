import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { PAGES } from '../../constants';
import { countries } from '@/lib/utils/countries';
import { ApolloQueryResult } from '@apollo/client';
import { DocumentsByCountryDocument, DocumentsByCountryQuery } from '@/generated/graphql';
import { initializeApollo } from '@/lib/apolloClient';

export { default } from '../index';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const country = context?.params?.country as string;
  const documentType = context?.params?.documentType as string;
  if (!country || !documentType) {
    return {
      redirect: {
        destination: PAGES.home,
        permanent: false
      }
    };
  }
  const cp = countries.find(
    (c) => c.country.toLowerCase().replace(' ', '-') === country.toLowerCase()
  );
  if (!cp) {
    return {
      redirect: {
        destination: PAGES.home,
        permanent: false
      }
    };
  }
  try {
    const client = initializeApollo(null, context);
    const documentsResult: ApolloQueryResult<DocumentsByCountryQuery> = await client.query({
      query: DocumentsByCountryDocument,
      variables: { country: cp.country },
      fetchPolicy: 'no-cache'
    });
    const documents = documentsResult.data?.DocumentsByCountry.data;
    const document = documents?.find(
      (d) =>
        d.type
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(' ', '') === documentType.toLowerCase().replace('-', '')
    );
    if (!document) {
      return {
        redirect: {
          destination: PAGES.home,
          permanent: false
        }
      };
    }
    return {
      redirect: {
        destination: `${PAGES.photo.takePhoto}?documentId=${document.id}`,
        permanent: false
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
