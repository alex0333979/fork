import type { NextPage } from 'next';
import React, { useMemo } from 'react';
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
  country: Country | null;
  document: Country | null;
}

const HomePage: NextPage<HomePageProps> = ({ country, document }) => {
  const title = useMemo(
    () =>
      country && document
        ? `Take Your ${country.country} ${document.type} Online`
        : country
        ? `Take Your ${country.country} Passport and Visa Photos Online`
        : 'Passport and Visa Photos Online',
    [country, document]
  );
  return (
    <>
      <NextSeo title={title} description={SEO.home.description} />
      <AppLayout>
        <Home country={country} document={document} />
      </AppLayout>
    </>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context: GetServerSidePropsContext
) => {
  const countryCode = context?.params?.country as string;
  const documentType = context?.params?.documentType as string;
  if (!countryCode) {
    return {
      props: {
        country: null,
        document: null
      }
    };
  }
  const country = countries.find(
    (c) => c.country.toLowerCase().replace(/\s/g, '-') === countryCode.toLowerCase()
  );
  if (!country) {
    return {
      props: {
        country: null,
        document: null
      }
    };
  }
  if (!documentType) {
    return {
      props: {
        country,
        document: null
      }
    };
  }
  try {
    const client = initializeApollo(null, context);
    const documentsResult: ApolloQueryResult<DocumentsByCountryQuery> = await client.query({
      query: DocumentsByCountryDocument,
      variables: { country: country.country },
      fetchPolicy: 'no-cache'
    });
    const documents = documentsResult.data?.DocumentsByCountry.data;
    const document = documents?.find(
      (d) =>
        d.type
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s/g, '-') === documentType.toLowerCase().replace(/\s/g, '-')
    );
    return {
      props: {
        country,
        document: document ?? null
      }
    };
  } catch (e) {
    return {
      props: {
        country: null,
        document: null
      }
    };
  }
};
