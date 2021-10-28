import type { NextPage } from 'next';
import PhotoLayout from '@/components/layout/photoLayout';
import React from 'react';
import PhotoStep2 from '@/components/photo/uploadPhoto';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { initializeApollo } from '@/lib/apolloClient';
import { ApolloQueryResult } from '@apollo/client';
import { Form, FormsDocument, FormsQuery } from '@/generated/graphql';
import { PAGES, PHOTO_FORM } from '../../constants';

export interface UploadPhotoPageProps {
  form: Form;
}

const UploadPhotoPage: NextPage<UploadPhotoPageProps> = ({ form }) => (
  <PhotoLayout>
    <PhotoStep2 form={form} />
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
    } else {
      return {
        props: {
          form
        }
      };
    }
  } catch (e) {
    return {
      redirect: {
        destination: PAGES.photo.selectType,
        permanent: false
      }
    };
  }
};
