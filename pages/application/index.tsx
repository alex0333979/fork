import type { GetStaticProps, NextPage } from 'next';
import React from 'react';
import { AppLayout } from '../../components';
import { initializeApollo } from '@/lib/apolloClient';
import { Form, FormsDocument, FormsQuery } from '@/generated/graphql';
import { ApolloQueryResult } from '@apollo/client';
import ApplicationForm from '@/components/Application/ApplicationForm';
import removeTypename from '@naveen-bharathi/remove-graphql-typename';

type EntryPageProps = {
  forms: Form[];
};

const Entry: NextPage<EntryPageProps> = ({ forms }: EntryPageProps) => {

  return (
    <AppLayout><ApplicationForm forms={forms}/></AppLayout>
  );
};

export const getStaticProps: GetStaticProps<EntryPageProps> = async () => {
  const client = initializeApollo();
  try {
    const result: ApolloQueryResult<FormsQuery> = await client.query({
      query: FormsDocument
    });

    const forms = removeTypename(result.data?.Forms || []);

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
