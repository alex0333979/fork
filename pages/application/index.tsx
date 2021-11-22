import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import { AppLayout } from '@/components/index';
import { COOKIES_TOKEN_NAME, initializeApollo } from '@/lib/apolloClient';
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
import { PAGES, PHOTO_FORM, SEO } from '../../constants';
import { NextSeo } from 'next-seo';
const ApplicationForm = dynamic(() => import('@/components/application/applicationForm'));

export interface EntryPageProps {
  forms: Form[];
  entry: {
    id: string | null;
    currentStep: number;
    completeStep: number;
    form: Form;
    formId: string;
  };
  step: number;
}

const Entry: NextPage<EntryPageProps> = ({ forms, entry, step }) => (
  <>
    <NextSeo
      title={SEO.passportApplication.title}
      description={SEO.passportApplication.description}
    />
    <AppLayout>
      <ApplicationForm forms={forms} entry={entry} step={step} />
    </AppLayout>
  </>
);

export const getServerSideProps: GetServerSideProps<EntryPageProps> = async (
  context: GetServerSidePropsContext
) => {
  const entryId = context?.params?.entryId as string;
  const step = context?.params?.step as string;
  const token = context?.query.token as string;
  if (token && context.res) {
    context.res.setHeader('set-cookie', `${COOKIES_TOKEN_NAME}=${token}`);
  }

  try {
    const client = initializeApollo(null, context);

    const result: ApolloQueryResult<FormsQuery> = await client.query({
      query: FormsDocument
    });
    const forms = result.data?.Forms || [];

    if (forms.length === 0) {
      return {
        redirect: {
          destination: PAGES.home,
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
            destination: `${PAGES.application.index}${lastEntry}/`,
            permanent: false
          }
        };
      } else {
        return {
          redirect: {
            destination: PAGES.application.create,
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

    if (entry && entry.form.name !== PHOTO_FORM) {
      let nextStep = entry.completeStep + 1;
      if (entry.completeStep + 1 > entry.form.steps.length) {
        nextStep = entry.completeStep;
      }
      if (!step || (step && parseInt(step, 10) > nextStep)) {
        return {
          redirect: {
            destination: `${PAGES.application.index}${entryId}/${nextStep}/`,
            permanent: false
          }
        };
      }
      const applicationForms = forms.filter((f) => f.name !== PHOTO_FORM);
      return {
        props: {
          forms: applicationForms ?? [],
          entry,
          step: parseInt(step, 10)
        }
      };
    }

    return {
      redirect: {
        destination: PAGES.application.index,
        permanent: false
      }
    };
  } catch (e) {
    return {
      redirect: {
        destination: PAGES.application.index,
        permanent: false
      }
    };
  }
};

export default Entry;
