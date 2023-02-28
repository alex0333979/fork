import React from 'react'
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { AppLayout } from '@/components/index'
import { SEO } from '@/constants/index'
import { IBlog } from '@/constants/blogs'
import { BlogProps } from '.'
import { createClient } from 'prismicio'
import { PageTypeHashes, PageUIDHashes } from '@/constants/PageUIDHashes'
const Article = dynamic(() => import('@/modules/blog/article'))

export interface ArticlePageProps {
  blog?: IBlog | null
}

const BlogPage: NextPage<BlogProps> = ({ page }) => (
  <>
    <NextSeo title={SEO.blog.title} description={SEO.blog.description} />
    <AppLayout>
      <Article page={page} />
    </AppLayout>
  </>
)

export const getServerSideProps: GetServerSideProps<BlogProps> = async (
  context: GetServerSidePropsContext,
) => {
  const previewData = context.previewData

  const client = createClient({ previewData })
  const page = await client.getByUID(
    PageTypeHashes.articlePage,
    PageUIDHashes.dynamic_blog_page,
  )

  return {
    props: {
      page,
    },
  }
}

export default BlogPage
