import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { NextSeo } from 'next-seo'

import PhotoLayout from '@/components/layout/photoLayout'
import TakeNewPhoto from '@/modules/photo/takeNewPhoto'
import { PrismicDocument } from '@prismicio/types'

import { SEO } from '@/constants'

interface TakeNewPhotoPageProps {
  page?: PrismicDocument<Record<string, any>, string, string>
}

const TakeNewPhotoPage: React.FC<TakeNewPhotoPageProps> = ({ page }) => (
  <>
    <NextSeo
      title={SEO.selectType.title}
      description={SEO.selectType.description}
    />
    <PhotoLayout>
      <TakeNewPhoto page={page} />
    </PhotoLayout>
  </>
)

export default TakeNewPhotoPage

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  if (context.res) {
    context.res.setHeader('Cache-Control', 'no-store')
  }
  return {
    props: {},
  }
}
