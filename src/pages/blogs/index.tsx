import React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { AppLayout } from '@/components/index'
import Blogs from '@/modules/blog/blogs'
import { SEO } from '@/constants/index'
import { blogs as staticBlogs, IBlog } from '@/constants/blogs'

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
