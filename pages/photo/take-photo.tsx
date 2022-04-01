import type { NextPage } from 'next';
import PhotoLayout from '@/components/layout/photoLayout';
import TakePhoto from '@/components/photo/takePhoto';
import React from 'react';
import { NextSeo } from 'next-seo';
import { PAGES, PHOTO_FORM, SEO } from '../../constants';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import {
  Entry,
  EntryDocument,
  EntryQuery,
  Form,
  FormsDocument,
  FormsQuery
} from '@/generated/graphql';
import { COOKIES_TOKEN_NAME, initializeApollo } from '@/lib/apolloClient';
import { ApolloQueryResult } from '@apollo/client';

export interface TakePhotoPageProps {
  form: Form;
  entry: Entry | null;
  documentId: string;
}

const TakePhotoPage: NextPage<TakePhotoPageProps> = ({ form, entry, documentId }) => (
  <>
    <NextSeo title={SEO.selectType.title} description={SEO.selectType.description} />
    <PhotoLayout>
      <TakePhoto form={form} entry={entry} documentId={documentId} />
    </PhotoLayout>
  </>
);

export default TakePhotoPage;

export const getServerSideProps: GetServerSideProps<TakePhotoPageProps> = async (
  context: GetServerSidePropsContext
) => {
  if (context.res) {
    context.res.setHeader('Cache-Control', 'no-store');
  }
  const token = context?.query.token as string;
  console.log({ query: context.query });
  if (token && context.res) {
    context.res.setHeader('set-cookie', `${COOKIES_TOKEN_NAME}=${token}`);
  }
  const entryId = context?.query?.entryId as string;
  const documentId = context?.query?.documentId as string;
  if (!documentId && !entryId) {
    return {
      redirect: {
        destination: PAGES.home,
        permanent: false
      }
    };
  }
  try {
    const client = initializeApollo(null, context);

    const result: ApolloQueryResult<FormsQuery> = await client.query({
      query: FormsDocument
    });
    const forms = result.data?.Forms || [];
    const form = forms.find((f) => f.name === PHOTO_FORM);

    if (!form) {
      return {
        redirect: {
          destination: PAGES.home,
          permanent: false
        }
      };
    }

    if (!entryId) {
      return {
        props: {
          form,
          entry: null,
          documentId
        }
      };
    }
    const entryResult: ApolloQueryResult<EntryQuery> = await client.query({
      query: EntryDocument,
      variables: { entryId },
      fetchPolicy: 'no-cache'
    });
    const entry = entryResult.data?.Entry.data;
    if (!entry) {
      return documentId
        ? {
            props: {
              form,
              entry: null,
              documentId
            }
          }
        : {
            redirect: {
              destination: PAGES.home,
              permanent: false
            }
          };
    }
    const docId = entry.form.steps[0].fields.find((f) => f.name === 'document_id')?.value as string;
    if (documentId !== docId.toString()) {
      console.log('here~~~5')
      return {
        redirect: {
          destination: `${PAGES.photo.takePhoto}?entryId=${entryId}&documentId=${docId}`,
          permanent: false
        }
      };
    }
    return {
      props: {
        form,
        entry,
        documentId
      }
    };
  } catch (e) {
    return {
      redirect: {
        destination: PAGES.photo.takePhoto,
        permanent: false
      }
    };
  }
};
