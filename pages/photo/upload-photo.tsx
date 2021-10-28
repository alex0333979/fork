import type { NextPage } from 'next';
import PhotoLayout from '@/components/layout/photoLayout';
import React from 'react';
import PhotoStep2 from '@/components/photo/uploadPhoto';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { initializeApollo } from '@/lib/apolloClient';
import { ApolloQueryResult } from '@apollo/client';
import {
  Entry,
  EntryDocument,
  EntryQuery,
  Form,
  FormsDocument,
  FormsQuery
} from '@/generated/graphql';
import { PAGES, PHOTO_FORM } from '../../constants';

export interface UploadPhotoPageProps {
  form: Form;
  entry: Entry | null;
}

const UploadPhotoPage: NextPage<UploadPhotoPageProps> = ({ form, entry }) => (
  <PhotoLayout>
    <PhotoStep2 form={form} entry={entry} />
  </PhotoLayout>
);

export default UploadPhotoPage;

export const getServerSideProps: GetServerSideProps<UploadPhotoPageProps> = async (
  context: GetServerSidePropsContext
) => {
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
          destination: PAGES.photo.selectType,
          permanent: false
        }
      };
    }
    const entryId = context?.query?.entryId as string;
    if (!entryId) {
      return {
        props: {
          form,
          entry: null
        }
      };
    }
    const entryResult: ApolloQueryResult<EntryQuery> = await client.query({
      query: EntryDocument,
      variables: { entryId }
    });
    const entry = entryResult.data?.Entry.data;
    return {
      props: {
        form,
        entry: entry ? entry : null
      }
    };
  } catch (e) {
    return {
      redirect: {
        destination: PAGES.photo.selectType,
        permanent: false
      }
    };
  }
};
