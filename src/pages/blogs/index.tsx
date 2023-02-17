import React from 'react'
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next'
import { NextSeo } from 'next-seo'
import { PrismicDocument } from '@prismicio/types'
import { createClient } from 'prismicio'

import { AppLayout } from '@/components/index'
import Blogs from '@/modules/blog/blogs'
import { SEO } from '@/constants/index'
import { IBlog } from '@/constants/blogs'
import { PageTypeHashes, PageUIDHashes } from '@/constants/PageUIDHashes'
import { withLocale } from '@/hocs'

export interface BlogProps {
  locale?: string
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
  const previewData = context.previewData
  const locale = context?.locale as string

  const client = createClient({ previewData })
  const page = await client.getByUID(
    PageTypeHashes.article_page,
    PageUIDHashes.dynamic_blog_page,
    { lang: locale },
  )

  return {
    props: {
      locale,
      page,
    },
  }
}

export default withLocale(BlogsPage)
