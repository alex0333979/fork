import React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { AppLayout } from '@/components/index'
import { SEO } from '@/constants/index'
import { IBlog } from '@/constants/blogs'
const Article = dynamic(() => import('@/components/blog/article'))

export interface ArticlePageProps {
  blog?: IBlog | null
}

const BlogPage: NextPage<ArticlePageProps> = () => (
  <>
    <NextSeo title={SEO.blog.title} description={SEO.blog.description} />
    <AppLayout>
      <Article />
    </AppLayout>
  </>
)

export const getServerSideProps: GetServerSideProps<
  ArticlePageProps
> = async () => ({
  props: {
    blog: null,
  },
})

export default BlogPage
