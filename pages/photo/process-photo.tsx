import type { NextPage } from 'next';
import PhotoLayout from '@/components/layout/photoLayout';
import React from 'react';
import ProcessPhoto from '@/components/photo/processPhoto';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { COOKIES_TOKEN_NAME, initializeApollo } from '@/lib/apolloClient';
import { ApolloQueryResult } from '@apollo/client';
import { Entry, EntryDocument, EntryQuery } from '@/generated/graphql';
import { PAGES, PHOTO_FORM, SEO } from '../../constants';
import { NextSeo } from 'next-seo';

export interface ProcessPhotoProps {
  entry: Entry;
}

const ProcessPhotoPage: NextPage<ProcessPhotoProps> = ({ entry }) => (
  <>
    <NextSeo
      title={SEO.passportApplication.title}
      description={SEO.passportApplication.description}
    />
    <PhotoLayout>
      <ProcessPhoto entry={entry} />
    </PhotoLayout>
  </>
);

export default ProcessPhotoPage;

export const getServerSideProps: GetServerSideProps<ProcessPhotoProps> = async (
  context: GetServerSidePropsContext
) => {
  if (context.res) {
    context.res.setHeader('Cache-Control', 'no-store');
  }
  const token = context?.query.token as string;
  if (token && context.res) {
    context.res.setHeader('set-cookie', `${COOKIES_TOKEN_NAME}=${token}`);
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
    if (entry && entry.form.name === PHOTO_FORM) {
      return {
        props: {
          entry
        }
      };
    }

    return {
      redirect: {
        destination: PAGES.photo.uploadPhoto,
        permanent: false
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
