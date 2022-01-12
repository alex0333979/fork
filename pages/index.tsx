import type { NextPage } from 'next';
import React from 'react';
import { AppLayout } from '../components';
import { NextSeo } from 'next-seo';
import { SEO } from '../constants';
import Home from '@/components/home';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { countries } from '@/lib/utils/countries';
import { initializeApollo } from '@/lib/apolloClient';
import { ApolloQueryResult } from '@apollo/client';
import { Country, DocumentsByCountryDocument, DocumentsByCountryQuery } from '@/generated/graphql';

export interface HomePageProps {
  document: Country | null;
}

const HomePage: NextPage<HomePageProps> = ({ document }) => (
  <>
    <NextSeo title={SEO.home.title} description={SEO.home.description} />
    <AppLayout>
      <Home document={document} />
    </AppLayout>
  </>
);

export default HomePage;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context: GetServerSidePropsContext
) => {
  const country = context?.params?.country as string;
  const documentType = context?.params?.documentType as string;
  if (!country || !documentType) {
    return {
      props: {
        document: null
      }
    };
  }
  const cp = countries.find(
    (c) => c.country.toLowerCase().replace(' ', '-') === country.toLowerCase()
  );
  if (!cp) {
    return {
      props: {
        document: null
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
        props: {
          document: null
        }
      };
    }
    return {
      props: {
        document
      }
    };
  } catch (e) {
    return {
      props: {
        document: null
      }
    };
  }
};
