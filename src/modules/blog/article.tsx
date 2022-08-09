import React, { useCallback } from 'react'
import { useRouter } from 'next/router'

import { PAGES } from '@/constants'
import { toSlug } from '@/utils'

const Article: React.FC = () => {
  const router = useRouter()

  const viewBlog = useCallback(
    (title: string) => {
      const slug = toSlug(title)

      router.replace(`${PAGES.blogs}/${slug}`)
    },
    [router],
  )

  return (
    <div className="article-page">
      <div className="container">
        <div className="article-wrap">
          <div className="article-title">
            <h1>How to take passport photo with iPhone? The Ideal DIY guide</h1>
            <p>May 2, 2022</p>
          </div>
          <div className="article-content">
            <div className="img">
              <img src="/images/blog/07.png" alt="" />
            </div>
            <div className="text">
              <p>
                A Passport photo can be necessary for anyone in many situations
                when applying or renewing a passport, visa for a country.
                <br />
                But when we get passport photos. The only thing which is very
                unacceptable is the pricing.
                <br />
                To resolve this and to minimize the cost of getting those
                passport photos, We have come up with a guide on “how to take
                passport photo with iPhone?” That’ll help you to make the
                perfect passport photo for you.
                <br />
                In this article, we are going you on everything from passport
                photo requirements to even guide you step by step on how to make
                those passport photos. A Passport photo can be necessary for
                anyone in many situations when applying or renewing a passport,
                visa for a country.
                <br />
                But when we get passport photos.
                <br />
                <br />
                The only thing which is very unacceptable is the pricing.
                <br />
                To resolve this and to minimize the cost of getting those
                passport photos, We have come up with a guide on “how to take
                passport photo with iPhone?” That’ll help you to make the
                perfect passport photo for you.
                <br />
                In this article, we are going you on everything from passport
                photo requirements to even guide you step by step on how to make
                those passport photos.
              </p>
              <blockquote>
                <p>
                  <i>
                    But when we get passport photos. The only thing which is
                    very unacceptable is the pricing. To resolve this and to
                    minimize the cost of getting those passport photos, We have
                    come up with a guide on how to take passport photo with
                    iPhone?
                  </i>
                </p>
              </blockquote>
              <p>
                A Passport photo can be necessary for anyone in many situations
                when applying or renewing a passport, visa for a country.
                <br />
                But when we get passport photos. The only thing which is very
                unacceptable is the pricing.
                <br />
                To resolve this and to minimize the cost of getting those
                passport photos, We have come up with a guide on “how to take
                passport photo with iPhone?” That’ll help you to make the
                perfect passport photo for you.
                <br />
                In this article, we are going you on everything from passport
                photo requirements to even guide you step by step on how to make
                those passport photos. A Passport photo can be necessary for
                anyone in many situations when applying or renewing a passport,
                visa for a country.
              </p>
            </div>
          </div>
          <div className="blog-list">
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
          </div>
        </div>

        <div className="blog-list">
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
        </div>
      </div>
    </div>
  )
}

export default Article
