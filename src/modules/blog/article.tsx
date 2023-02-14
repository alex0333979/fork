import React from 'react'
import * as prismicH from '@prismicio/helpers'
import moment from 'moment'
import { PrismicRichText, SliceZone } from '@prismicio/react'

import { BlogProps } from '@/pages/blogs'
import { components } from 'slices'

const Article: React.FC<BlogProps> = ({ page }) => {
  const column = true
  const contentSlice = page?.data.slices.filter(
    (item: any) => item.slice_type === 'content',
  )
  const blockquoteSlice = page?.data.slices.filter(
    (item: any) => item.slice_type === 'blockquote',
  )

  return (
    <div className="article-page">
      <div className="container">
        <div className="article-wrap">
          <div className="article-title">
            <PrismicRichText field={page?.data.title} />
            <p>
              {moment(
                prismicH.asDate(page?.data.date)?.toLocaleDateString(),
              ).format('LL')}
            </p>
          </div>

          <SliceZone
            slices={[contentSlice[0]]}
            components={components}
            context={{ page }}
          />

          <SliceZone
            slices={blockquoteSlice}
            components={components}
            context={{ page, column }}
          />
        </div>

        <SliceZone
          slices={blockquoteSlice}
          components={components}
          context={{ page }}
        />
      </div>
    </div>
  )
}

export default Article
