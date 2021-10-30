import type { NextPage } from 'next';
import PhotoLayout from '@/components/layout/photoLayout';
import React from 'react';
import ProcessPhoto from '@/components/photo/processPhoto';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { initializeApollo } from '@/lib/apolloClient';
import { ApolloQueryResult } from '@apollo/client';
import { Entry, EntryDocument, EntryQuery } from '@/generated/graphql';
import { PAGES } from '../../constants';

export interface ProcessPhotoProps {
  entry: Entry;
}

const ProcessPhotoPage: NextPage<ProcessPhotoProps> = ({ entry }) => (
  <PhotoLayout>
    <ProcessPhoto entry={entry} />
  </PhotoLayout>
);

export default ProcessPhotoPage;

export const getServerSideProps: GetServerSideProps<ProcessPhotoProps> = async (
  context: GetServerSidePropsContext
) => {
  if (context.res) {
    context.res.setHeader('Cache-Control', 'no-store');
  }
  try {
    const client = initializeApollo(null, context);
    const entryId = context?.query?.entryId as string;
    if (!entryId) {
      return {
        redirect: {
          destination: PAGES.photo.selectType,
          permanent: false
        }
      };
    }
    const entryResult: ApolloQueryResult<EntryQuery> = await client.query({
      query: EntryDocument,
      variables: { entryId }
    });
    const entry = entryResult.data?.Entry.data;
    if (!entry) {
      return {
        redirect: {
          destination: PAGES.photo.uploadPhoto,
          permanent: false
        }
      };
    }
    return {
      props: {
        entry
      }
    };
  } catch (e) {
    return {
      redirect: {
        destination: PAGES.photo.uploadPhoto,
        permanent: false
      }
    };
  }
};
