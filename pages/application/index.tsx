import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import { AppLayout } from '@/components/index';
import { initializeApollo } from '@/lib/apolloClient';
import {
  CartDocument,
  CartQuery,
  EntryDocument,
  EntryQuery,
  Form,
  FormsDocument,
  FormsQuery
} from '@/generated/graphql';
import { ApolloQueryResult } from '@apollo/client';
import dynamic from 'next/dynamic';
const ApplicationForm = dynamic(() => import('@/components/application/applicationForm'));

export interface EntryPageProps {
  forms: Form[];
  entry: {
    id: string | null;
    currentStep: number;
    form: Form;
    formId: string;
  };
  step: number;
}

const Entry: NextPage<EntryPageProps> = ({ forms, entry, step }) => (
  <AppLayout>
    <ApplicationForm forms={forms} entry={entry} step={step} />
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps<EntryPageProps> = async (
  context: GetServerSidePropsContext
) => {
  const entryId = context?.params?.entryId as string;
  const step = context?.params?.step as string;

  try {
    const client = initializeApollo(null, context);

    const result: ApolloQueryResult<FormsQuery> = await client.query({
      query: FormsDocument
    });
    const forms = result.data?.Forms || [];

    if (forms.length === 0) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }

    if (!entryId) {
      const result: ApolloQueryResult<CartQuery> = await client.query({
        query: CartDocument
      });
      const cart = result.data.Cart.data;
      const items = cart?.items ?? [];
      if (items.length > 0) {
        const lastEntry = items[items.length - 1].productId;
        return {
          redirect: {
            destination: `/application/${lastEntry}/`,
            permanent: false
          }
        };
      } else {
        return {
          redirect: {
            destination: '/application/create',
            permanent: false
          }
        };
      }
    }

    const entryResult: ApolloQueryResult<EntryQuery> = await client.query({
      query: EntryDocument,
      variables: { entryId }
    });
    const entry = entryResult.data?.Entry.data;

    if (entry) {
      let currentStep = entry.currentStep + 1;
      if (currentStep > entry.form.steps.length + 1) {
        currentStep -= 1;
      }
      if (!step || (step && parseInt(step, 10) > currentStep)) {
        return {
          redirect: {
            destination: `/application/${entryId}/${currentStep}/`,
            permanent: false
          }
        };
      }
      return {
        props: {
          forms: forms ?? [],
          entry,
          step: parseInt(step, 10)
        }
      };
    }

    return {
      redirect: {
        destination: '/application',
        permanent: false
      }
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/application',
        permanent: false
      }
    };
  }
};

export default Entry;
