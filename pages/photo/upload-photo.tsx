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
import { FACING_MODES } from 'react-html5-camera-photo';

export interface UploadPhotoPageProps {
  form: Form;
  entry: Entry | null;
  type: string;
}

const UploadPhotoPage: NextPage<UploadPhotoPageProps> = ({ form, entry, type }) => (
  <PhotoLayout>
    <PhotoStep2 form={form} entry={entry} type={type} />
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
    const type = context?.query.type as string;
    if (!entryId) {
      return {
        props: {
          form,
          entry: null,
          type: type === FACING_MODES.ENVIRONMENT ? FACING_MODES.ENVIRONMENT : FACING_MODES.USER
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
        entry: entry ? entry : null,
        type: type === 'selfie' ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT
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
