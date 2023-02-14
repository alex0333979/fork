import React, { useCallback } from 'react'
import { useRouter } from 'next/router'

import { SliceProps } from '@/modules/about'
import { PAGES } from '@/constants'
import { toSlug } from '@/utils'

const Blockquote: React.FC<SliceProps> = ({ /* slice, */ context }) => {
  const router = useRouter()

  const viewBlog = useCallback(
    (title: string) => {
      const slug = toSlug(title)

      router.replace(`${PAGES.blogs}/${slug}`)
    },
    [router],
  )

  return (
    <div className="blog-list">
      {context?.column ? (
        <div className="blog-card">
          <ul>
            <li>
              <a
                href="javascript:void(0)"
                className="card-link"
                onClick={() =>
                  viewBlog(`How to take your baby’s passport photo`)
                }
              />
              <div className="text">
                <h4>
                  Explore Utah’s national parks with TPG’s guide to the...
                </h4>
                <a
                  href="javascript:void(0)"
                  className="main-btn no-border"
                  onClick={() =>
                    viewBlog(`How to take your baby’s passport photo`)
                  }>
                  Read article
                </a>
              </div>
              <div className="img">
                <img src="/images/blog/03.png" alt="" />
              </div>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="card-link"
                onClick={() =>
                  viewBlog(`How to take your baby’s passport photo`)
                }
              />
              <div className="text">
                <h4>
                  Everything you need to know about the best seats on Sou...
                </h4>
                <a
                  href="javascript:void(0)"
                  className="main-btn no-border"
                  onClick={() =>
                    viewBlog(`How to take your baby’s passport photo`)
                  }>
                  Read article
                </a>
              </div>
              <div className="img">
                <img src="/images/blog/04.png" alt="" />
              </div>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="card-link"
                onClick={() =>
                  viewBlog(`How to take your baby’s passport photo`)
                }
              />
              <div className="text">
                <h4>
                  9 things to consider when choosing to book via a portal...
                </h4>
                <a
                  href="javascript:void(0)"
                  className="main-btn no-border"
                  onClick={() =>
                    viewBlog(`How to take your baby’s passport photo`)
                  }>
                  Read article
                </a>
              </div>
              <div className="img">
                <img src="/images/blog/05.png" alt="" />
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <>
          <div className="blog-card">
            <a
              href="javascript:void(0)"
              className="card-link"
              onClick={() => viewBlog(`How to take your baby’s passport photo`)}
            />
            <div className="img">
              <img src="/images/blog/04.png" alt="" />
            </div>
            <div className="text">
              <div className="title">
                <h3>Bonaire: New Tourism Tax and Covid Entry Requirements</h3>
                <p>
                  But don’t stress — it can be done. From all the official rules
                  about passport photos to tips and
                </p>
              </div>
              <div className="btn-wrap">
                <a
                  href="javascript:void(0)"
                  className="main-btn"
                  onClick={() =>
                    viewBlog(`How to take your baby’s passport photo`)
                  }>
                  Read article
                </a>
              </div>
            </div>
          </div>
          <div className="blog-card">
            <a
              href="javascript:void(0)"
              className="card-link"
              onClick={() => viewBlog(`How to take your baby’s passport photo`)}
            />
            <div className="img">
              <img src="/images/blog/05.png" alt="" />
            </div>
            <div className="text">
              <div className="title">
                <h3>Study Shows Gas Prices Surpass Covid as Major Trav...</h3>
                <p>
                  But don’t stress — it can be done. From all the official rules
                  about passport photos to tips and
                </p>
              </div>
              <div className="btn-wrap">
                <a
                  href="javascript:void(0)"
                  className="main-btn"
                  onClick={() =>
                    viewBlog(`How to take your baby’s passport photo`)
                  }>
                  Read article
                </a>
              </div>
            </div>
          </div>
          <div className="blog-card">
            <a
              href="javascript:void(0)"
              className="card-link"
              onClick={() => viewBlog(`How to take your baby’s passport photo`)}
            />
            <div className="img">
              <img src="/images/blog/06.png" alt="" />
            </div>
            <div className="text">
              <div className="title">
                <h3>EU Countries Starting to Reopen Their Embassies in...</h3>
                <p>
                  But don’t stress — it can be done. From all the official rules
                  about passport photos to tips and
                </p>
              </div>
              <div className="btn-wrap">
                <a
                  href="javascript:void(0)"
                  className="main-btn"
                  onClick={() =>
                    viewBlog(`How to take your baby’s passport photo`)
                  }>
                  Read article
                </a>
              </div>
            </div>
          </div>
          <div className="load-more">
            <button type="button" className="main-btn big outline">
              LOAD MORE ARTICLES
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Blockquote
