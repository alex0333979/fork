import type { NextPage } from 'next';
import React from 'react';
import { AppLayout } from '../components';
import { NextSeo } from 'next-seo';
import { PAGES, SEO } from '../constants';
import Home from '@/components/home';
import { CountriesDocument, CountriesQuery, Country } from '@/generated/graphql';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { initializeApollo } from '@/lib/apolloClient';
import { ApolloQueryResult } from '@apollo/client';

export interface HomePageProps {
  countries: Country[];
}

const HomePage: NextPage<HomePageProps> = ({ countries }) => (
  <>
    <NextSeo title={SEO.home.title} description={SEO.home.description} />
    <AppLayout>
      <Home countries={countries} />
    </AppLayout>
  </>
);
export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const client = initializeApollo(null, context);

    const result: ApolloQueryResult<CountriesQuery> = await client.query({
      query: CountriesDocument
    });
    const countries = result.data?.Countries.data || [];
    return {
      props: {
        countries
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

export default HomePage;
