import type { NextPage } from 'next';
import PhotoLayout from '@/components/layout/photoLayout';
import SelectType from '@/components/photo/selectType';
import React from 'react';
import { NextSeo } from 'next-seo';
import { PAGES, SEO } from '../../constants';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export interface SelectTypePageProps {
  documentId: string;
}

const SelectTypePage: NextPage<SelectTypePageProps> = ({ documentId }) => (
  <>
    <NextSeo title={SEO.selectType.title} description={SEO.selectType.description} />
    <PhotoLayout>
      <SelectType documentId={documentId} />
    </PhotoLayout>
  </>
);

export const getServerSideProps: GetServerSideProps<SelectTypePageProps> = async (
  context: GetServerSidePropsContext
) => {
  const documentId = context?.query?.documentId as string;
  if (!documentId) {
    return {
      redirect: {
        destination: PAGES.home,
        permanent: false
      }
    };
  }
  return {
    props: {
      documentId
    }
  };
};

export default SelectTypePage;
