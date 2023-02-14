import React from 'react'
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next'
import { NextSeo } from 'next-seo'
import { PrismicDocument } from '@prismicio/types'

import { AppLayout } from '@/components/index'
import Blogs from '@/modules/blog/blogs'
import { SEO } from '@/constants/index'
import { IBlog } from '@/constants/blogs'
import { createClient } from 'prismicio'
import { PageTypeHashes, PageUIDHashes } from '@/constants/PageUIDHashes'

export interface BlogProps {
  page?: PrismicDocument<Record<string, any>, string, string>
}

export interface ArticlePageProps {
  blogs: IBlog[]
}

const BlogsPage: NextPage = () => (
  <>
    <NextSeo title={SEO.blogs.title} description={SEO.blogs.description} />
    <AppLayout>
      <Blogs />
    </AppLayout>
  </>
)

export const getServerSideProps: GetServerSideProps<BlogProps> = async (
  context: GetServerSidePropsContext,
) => {
  const previewData = context.params?.previewData

  const client = createClient({ previewData })
  const page = await client.getByUID(
    PageTypeHashes.article_page,
    PageUIDHashes.dynamic_blog_page,
  )

  return {
    props: {
      page,
    },
  }
}

export default BlogsPage
