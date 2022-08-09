import React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { AppLayout } from '@/components/index'
import { SEO } from '@/constants/index'
import { blogs as staticBlogs, IBlog } from '@/constants/blogs'
const Blogs = dynamic(() => import('@/modules/blog/blogs'))

export interface ArticlePageProps {
  blogs: IBlog[]
}

const BlogsPage: NextPage<ArticlePageProps> = () => (
  <>
    <NextSeo title={SEO.blogs.title} description={SEO.blogs.description} />
    <AppLayout>
      <Blogs />
    </AppLayout>
  </>
)

export const getServerSideProps: GetServerSideProps<
  ArticlePageProps
> = async () => ({
  props: {
    blogs: staticBlogs,
  },
})

export default BlogsPage
