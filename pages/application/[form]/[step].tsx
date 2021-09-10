import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { AppLayout } from '../../../components';
import { useRouter } from 'next/router';
import { initializeApollo } from '../../../lib/apolloClient';
import { FormsDocument, FormsQuery } from '../../../graphql/generated/graphql';
import { ApolloQueryResult } from '@apollo/client';

type EntryStaticProp = {
  params: EntryParamProps;
};

const Entry: NextPage<EntryStaticProp> = ({
  params
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const step = router.query.step;

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

export const getStaticProps: GetStaticProps<EntryStaticProp> = async ({ params }) => {
  console.log(params);
  return {
    props: {
      params: { form: '', step: '' }
    }
  };
};

type EntryParamProps = {
  form: string;
  step: string;
};

export const getStaticPaths: GetStaticPaths<EntryParamProps> = async () => {
  const result: ApolloQueryResult<FormsQuery> = await client.query({
    query: FormsDocument
  });

  const forms = result.data?.Forms || [];

  const paths: { params: EntryParamProps }[] = [];
  forms.forEach((form) => {
    form.steps.forEach((step) => {
      paths.push({ params: { form: form.name, step: `${step.step}` } });
    });
  });
  return { paths, fallback: true };
};

export default Entry;
