import React, { useCallback } from 'react'
import { useRouter } from 'next/router'

import { PAGES } from '@/constants/index'
import { toSlug } from '@/lib/utils/string'

const Blogs: React.FC = () => {
  const router = useRouter()

  const viewBlog = useCallback(
    (title: string) => {
      const slug = toSlug(title)

      router.push(`${PAGES.blogs}/${slug}`)
    },
    [router],
  )

  return (
    <div className="blog-page">
      <div className="page-intro">
        <div className="container">
          <div className="intro-wrap">
            <div className="title">
              <h1>How to take your baby’s passport photo</h1>
              <p>
                But don’t stress — it can be done. From all the official rules
                about passport photos to tips and tricks for photographing your
                baby, we’ve got you covered.
              </p>
              <a
                href="javascript:void(0)"
                className="main-btn"
                onClick={() =>
                  viewBlog(`How to take your baby’s passport photo`)
                }>
                Read article
              </a>
            </div>
            <div className="img">
              <span>
                <img src="/images/blog/00.png" alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-wrap">
        <div className="container">
          <div className="blog-list">
            <div className="blog-card">
              <a
                href="javascript:void(0)"
                className="card-link"
                onClick={() =>
                  viewBlog(`How to take your baby’s passport photo`)
                }
              />
              <div className="img">
                <img src="/images/blog/01.png" alt="" />
              </div>
              <div className="text">
                <div className="title">
                  <h3>
                    The 12 best increased card offers to sign up for in April
                  </h3>
                  <p>
                    But don’t stress — it can be done. From all the official
                    rules about passport photos to tips and
                  </p>
                </div>
                <div className="btn-wrap">
                  <a
                    href="javascript:void(0)"
                    className="main-btn no-border"
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
                onClick={() =>
                  viewBlog(`How to take your baby’s passport photo`)
                }
              />
              <div className="img">
                <img src="/images/blog/02.png" alt="" />
              </div>
              <div className="text">
                <div className="title">
                  <h3>
                    Wi-Fi on cruise ships: 5 things to know about internet
                    use...
                  </h3>
                  <p>
                    But don’t stress — it can be done. From all the official
                    rules about passport photos to tips and
                  </p>
                </div>
                <div className="btn-wrap">
                  <a
                    href="javascript:void(0)"
                    className="main-btn no-border"
                    onClick={() =>
                      viewBlog(`How to take your baby’s passport photo`)
                    }>
                    Read article
                  </a>
                </div>
              </div>
            </div>
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

          <div className="blog-list bg">
            <div className="blog-card small">
              <a
                href="javascript:void(0)"
                className="card-link"
                onClick={() =>
                  viewBlog(`How to take your baby’s passport photo`)
                }
              />
              <div className="img">
                <img src="/images/blog/04.png" alt="" />
              </div>
              <div className="text">
                <div className="title">
                  <h3>Your guide to the Chase Ink Business credit cards</h3>
                  <p>
                    But don’t stress — it can be done. From all the official
                    rules about passport photos to tips and
                  </p>
                </div>
                <div className="btn-wrap">
                  <a
                    href="javascript:void(0)"
                    className="main-btn no-border"
                    onClick={() =>
                      viewBlog(`How to take your baby’s passport photo`)
                    }>
                    Read article
                  </a>
                </div>
              </div>
            </div>
            <div className="blog-card small">
              <a
                href="javascript:void(0)"
                className="card-link"
                onClick={() =>
                  viewBlog(`How to take your baby’s passport photo`)
                }
              />
              <div className="img">
                <img src="/images/blog/05.png" alt="" />
              </div>
              <div className="text">
                <div className="title">
                  <h3>
                    Everything you need to know about traveling with medication
                  </h3>
                  <p>
                    But don’t stress — it can be done. From all the official
                    rules about passport photos to tips and
                  </p>
                </div>
                <div className="btn-wrap">
                  <a
                    href="javascript:void(0)"
                    className="main-btn no-border"
                    onClick={() =>
                      viewBlog(`How to take your baby’s passport photo`)
                    }>
                    Read article
                  </a>
                </div>
              </div>
            </div>
            <div className="blog-card small">
              <a
                href="javascript:void(0)"
                className="card-link"
                onClick={() =>
                  viewBlog(`How to take your baby’s passport photo`)
                }
              />
              <div className="img">
                <img src="/images/blog/06.png" alt="" />
              </div>
              <div className="text">
                <div className="title">
                  <h3>
                    Escape crowded national parks at these 7 alternate
                    destinations
                  </h3>
                  <p>
                    But don’t stress — it can be done. From all the official
                    rules about passport photos to tips and
                  </p>
                </div>
                <div className="btn-wrap">
                  <a
                    href="javascript:void(0)"
                    className="main-btn no-border"
                    onClick={() =>
                      viewBlog(`How to take your baby’s passport photo`)
                    }>
                    Read article
                  </a>
                </div>
              </div>
            </div>
            <div className="blog-card small">
              <a
                href="javascript:void(0)"
                className="card-link"
                onClick={() =>
                  viewBlog(`How to take your baby’s passport photo`)
                }
              />
              <div className="img">
                <img src="/images/blog/06.png" alt="" />
              </div>
              <div className="text">
                <div className="title">
                  <h3>
                    From airports to hotels: Tips for skipping long lines when
                    you t...
                  </h3>
                  <p>
                    But don’t stress — it can be done. From all the official
                    rules about passport photos to tips and
                  </p>
                </div>
                <div className="btn-wrap">
                  <a
                    href="javascript:void(0)"
                    className="main-btn no-border"
                    onClick={() =>
                      viewBlog(`How to take your baby’s passport photo`)
                    }>
                    Read article
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="blog-list">
            <div className="blog-card reverse">
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
                      Current Shortage of Airline Pilots Could Take Years to
                      Re...
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
                      Switzerland: From May 2 Entry Restrictions Lifted...
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
                      Spain Relaxes the Requirement for Wearing Masks I...
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
            <div className="blog-card big">
              <a
                href="javascript:void(0)"
                className="card-link"
                onClick={() =>
                  viewBlog(`How to take your baby’s passport photo`)
                }
              />
              <div className="img">
                <img src="/images/blog/02.png" alt="" />
              </div>
              <div className="text">
                <div className="title">
                  <h3>
                    Earn easy Hilton points by eating at your favorite
                    restaurants
                  </h3>
                  <p>
                    But don’t stress — it can be done. From all the official
                    rules about passport photos to tips and
                  </p>
                </div>
                <div className="btn-wrap">
                  <a
                    href="javascript:void(0)"
                    className="main-btn no-border"
                    onClick={() =>
                      viewBlog(`How to take your baby’s passport photo`)
                    }>
                    Read article
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="blog-list">
            <div className="blog-card">
              <a
                href="javascript:void(0)"
                className="card-link"
                onClick={() =>
                  viewBlog(`How to take your baby’s passport photo`)
                }
              />
              <div className="img">
                <img src="/images/blog/04.png" alt="" />
              </div>
              <div className="text">
                <div className="title">
                  <h3>Bonaire: New Tourism Tax and Covid Entry Requirements</h3>
                  <p>
                    But don’t stress — it can be done. From all the official
                    rules about passport photos to tips and
                  </p>
                </div>
                <div className="btn-wrap">
                  <a
                    href="javascript:void(0)"
                    className="main-btn no-border"
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
                onClick={() =>
                  viewBlog(`How to take your baby’s passport photo`)
                }
              />
              <div className="img">
                <img src="/images/blog/05.png" alt="" />
              </div>
              <div className="text">
                <div className="title">
                  <h3>Study Shows Gas Prices Surpass Covid as Major Trav...</h3>
                  <p>
                    But don’t stress — it can be done. From all the official
                    rules about passport photos to tips and
                  </p>
                </div>
                <div className="btn-wrap">
                  <a
                    href="javascript:void(0)"
                    className="main-btn no-border"
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
                onClick={() =>
                  viewBlog(`How to take your baby’s passport photo`)
                }
              />
              <div className="img">
                <img src="/images/blog/06.png" alt="" />
              </div>
              <div className="text">
                <div className="title">
                  <h3>EU Countries Starting to Reopen Their Embassies in...</h3>
                  <p>
                    But don’t stress — it can be done. From all the official
                    rules about passport photos to tips and
                  </p>
                </div>
                <div className="btn-wrap">
                  <a
                    href="javascript:void(0)"
                    className="main-btn no-border"
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
    </div>
  )
}

export default Blogs
