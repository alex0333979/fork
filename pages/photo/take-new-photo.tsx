import type { NextPage } from 'next'
import PhotoLayout from '@/components/layout/photoLayout'
import TakeNewPhoto from '@/components/photo/takeNewPhoto'
import React from 'react'
import { NextSeo } from 'next-seo'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { SEO } from '../../constants'

const TakeNewPhotoPage: NextPage = () => (
  <>
    <NextSeo
      title={SEO.selectType.title}
      description={SEO.selectType.description}
    />
    <PhotoLayout>
      <TakeNewPhoto />
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
