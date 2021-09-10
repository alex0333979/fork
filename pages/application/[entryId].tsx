import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { AppLayout } from '../../components';
import { useRouter } from 'next/router';
import { initializeApollo } from '../../lib/apolloClient';
import { Form, FormsDocument, FormsQuery } from '../../graphql/generated/graphql';
import { ApolloQueryResult } from '@apollo/client';

type EntryPageProps = {
  forms: Form[]
};

const Entry: NextPage<EntryPageProps> = ({
  forms
}: EntryPageProps) => {
  const router = useRouter();
  const entryId = router.query.entryId;

  return (
    <>
      <Head>
        <title>Biometric Photos</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <AppLayout>{/*<h1>Url: {`${params.form ? params.form : ''}/${step}`}</h1>*/}</AppLayout>
    </>
  );
};

const client = initializeApollo();

export const getStaticProps: GetStaticProps<EntryPageProps> = async () => {
  const result: ApolloQueryResult<FormsQuery> = await client.query({
    query: FormsDocument
  });

  const forms = result.data?.Forms || [];

  return {
    props: {
      forms
    }
  };
};

export default Entry;
