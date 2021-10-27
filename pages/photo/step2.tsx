import type { NextPage } from 'next';
import PhotoLayout from '@/components/layout/photoLayout';
import React from 'react';
import PhotoStep2 from '@/components/photo/step2';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { initializeApollo } from '@/lib/apolloClient';
import { ApolloQueryResult } from '@apollo/client';
import { Form, FormsDocument, FormsQuery } from '@/generated/graphql';
import { PHOTO_FORM } from '../../constants';

export interface PhotoStep2PageProps {
  form: Form;
}

const PhotoStep2Page: NextPage<PhotoStep2PageProps> = ({ form }) => (
  <PhotoLayout>
    <PhotoStep2 form={form} />
  </PhotoLayout>
);

export default PhotoStep2Page;

export const getServerSideProps: GetServerSideProps<PhotoStep2PageProps> = async (
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
          destination: '/photo/step1',
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
        destination: '/application',
        permanent: false
      }
    };
  }
};
