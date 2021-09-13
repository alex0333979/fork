import type { GetStaticProps, NextPage } from 'next';
import React from 'react';
import { AppLayout } from '../../components';
import { useRouter } from 'next/router';
import { initializeApollo } from '@/lib/apolloClient';
import { Form, FormsDocument, FormsQuery } from '@/generated/graphql';
import { ApolloQueryResult } from '@apollo/client';
import ApplicationForm from '@/components/Application/ApplicationForm';

type EntryPageProps = {
  forms: Form[];
};

const Entry: NextPage<EntryPageProps> = ({ forms }: EntryPageProps) => {
  const { query } = useRouter();

  return (
    <AppLayout><ApplicationForm id={query.entryId as string} forms={forms}/></AppLayout>
  );
};

export const getStaticProps: GetStaticProps<EntryPageProps> = async () => {
  const client = initializeApollo();
  try {
    const result: ApolloQueryResult<FormsQuery> = await client.query({
      query: FormsDocument
    });

    const forms = result.data?.Forms || [];

    return {
      props: {
        forms
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default Entry;
