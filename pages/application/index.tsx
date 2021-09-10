import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { initializeApollo } from '../../lib/apolloClient';
import { FormsDocument, FormsQuery } from '../../graphql/generated/graphql';
import { ApolloQueryResult } from '@apollo/client';

const Application: NextPage = () => {
  return (
    <Head>
      <title>Biometric Photos</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />
    </Head>
  );
};

const client = initializeApollo();

export const getStaticProps: GetStaticProps = async (context) => {
  const result: ApolloQueryResult<FormsQuery> = await client.query({
    query: FormsDocument
  });

  if (result.data?.Forms.length > 0) {
    return {
      redirect: {
        destination: `/application/${result.data?.Forms[0].name}/1`,
        permanent: false
      }
    };
  }

  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  };
};

export default Application;
