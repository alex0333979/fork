/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useMemo, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { useMediaQuery } from '@material-ui/core'
import { PAGES } from '@/constants'
import { useAuth, useApp } from '@/hooks'
import { useRouter } from 'next/router'
import { getFaqLink } from './utils'
const LanguageCurrencySelector = dynamic(
  () => import('@/components/elements/languageCurrencySelector'),
  {
    ssr: false,
  },
)

const AppHeader: React.FC<{
  showNav?: boolean
}> = ({ showNav = true }) => {
  const router = useRouter()
  const matches = useMediaQuery('only screen and (min-width: 641px)')
  const [mobileNavVisible, setMobileNavVisible] = useState<boolean>(false)
  const { cart } = useAuth()
  const { setOpenDocument } = useApp()

  const onClickCart = useCallback(async () => {
    if (cart?.items?.length ?? 0 > 0) {
      await router.push(PAGES.cart)
    } else {
      await router.push(PAGES.photo.index)
    }
  }, [cart?.items?.length, router])

  useEffect(() => {
    if (mobileNavVisible) {
      document.body.classList.add('scroll-lock')
    } else {
      document.body.classList.remove('scroll-lock')
    }
  }, [mobileNavVisible])

  const faqLink = useMemo(() => getFaqLink(router.asPath), [router.asPath])

  return (
    <header>
      <div className="wrapper">
        <div className="toolbar">
          <div className="left-side">
            <div className="logo">
              <Link href={PAGES.home}>
                <a>
                  <Image
                    src="/images/new-logo.svg"
                    alt=""
                    width={450}
                    height={141}
                  />
                </a>
              </Link>
            </div>
            {showNav && (
              <div
                className={classNames({
                  'main-menu': true,
                  open: mobileNavVisible,
                })}>
                <nav>
                  <ul>
                    <li>
                      {!matches && (
                        <LanguageCurrencySelector wrapperClass="mobile-language-selector" />
                      )}
                    </li>
                    <li>
                      <a
                        onClick={async () => {
                          setOpenDocument(true)
                          await router.push(PAGES.home)
                        }}>
                        <span>Passport Photo</span>
                      </a>
                    </li>
                    <li>
                      <Link href={faqLink}>
                        <a>
                          <span>FAQ</span>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href={PAGES.about}>
                        <a>
                          <span>About</span>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href={PAGES.contactUs}>
                        <a>
                          <span>Contact Us</span>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="mobile-btn">
                  <button
                    type="button"
                    className="main-btn"
                    onClick={async () => {
                      setOpenDocument(true)
                      await router.push(PAGES.home)
                    }}>
                    START NOW
                  </button>
                </div>
                {/* <div>*/}
                {/*  <div class="">*/}
                {/*    <button type="button" class="main-btn big">Select a packages</button>*/}
                {/*  </div>*/}
                {/* </div>*/}
              </div>
            )}
          </div>
          {showNav && (
            <div className="right-side">
              {matches && <LanguageCurrencySelector />}

              {/* <div className="location">
              <div className="current">
                <p>{'United States'}</p>
              </div>
            </div> */}
              {/* <SelectCountry selectedCountry={onSelectedCountry} /> */}
              {/* <div className="user-btn">
              <Link href={PAGES.home}>
                <a>
                  <span className="icon-user" />
                </a>
              </Link>
            </div> */}
              <div className="cart-btn">
                <a onClick={onClickCart}>
                  <span className="icon-cart" /> {cart?.items?.length ?? 0}
                </a>
              </div>
              <div className="sign-btn">
                <button
                  type="button"
                  className="main-btn small"
                  onClick={async () => {
                    setOpenDocument(true)
                    await router.push(PAGES.home)
                  }}>
                  {'START NOW'}
                </button>
              </div>
              {/* {isAuthenticated ? (*/}
              {/*  <div className="sign-btn">*/}
              {/*    <button type="button" className="main-btn small blank" onClick={logout}>*/}
              {/*      {'Sign Out'}*/}
              {/*    </button>*/}
              {/*  </div>*/}
              {/* ) : (*/}
              {/*  <div className="sign-btn">*/}
              {/*    <button type="button" className="main-btn small blank">*/}
              {/*      {'Sign In'}*/}
              {/*    </button>*/}
              {/*  </div>*/}
              {/* )}*/}
              <div
                className={classNames({
                  'menu-btn': true,
                  open: mobileNavVisible,
                })}>
                <button
                  type="button"
                  onClick={() => setMobileNavVisible(!mobileNavVisible)}>
                  <span className="icon-menu" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default AppHeader
