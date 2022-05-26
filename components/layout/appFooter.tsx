import React, { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PAGES } from '../../constants'
import moment from 'moment'
import { getFaqLink } from './utils'

const AppFooter: React.FC = () => {
  const router = useRouter()

  const faqLink = useMemo(() => getFaqLink(router.asPath), [router.asPath])

  return (
    <footer>
      <div className="additional-menu">
        <div className="container">
          <div className="data-wrap">
            <div className="logo">
              <Link href={'/'}>
                <a>
                  <Image
                    src="/images/logo.svg"
                    alt=""
                    width={450}
                    height={141}
                  />
                </a>
              </Link>
            </div>
            <div className="menu">
              <ul>
                <li>{'What we offer'}</li>
                <li>
                  <Link href={PAGES.photo.index}>
                    <a>{'Passport photo'}</a>
                  </Link>
                </li>
              </ul>
              <ul>
                <li>{'Resources'}</li>
                <li>
                  <Link href={faqLink}>
                    <a>{'FAQ'}</a>
                  </Link>
                </li>
              </ul>
              <ul>
                <li>{'About us'}</li>
                <li>
                  <Link href={PAGES.about}>
                    <a>{'About'}</a>
                  </Link>
                </li>
                <li>
                  <Link href={PAGES.contactUs}>
                    <a>{'Contact Us'}</a>
                  </Link>
                </li>
              </ul>
              <ul>
                <li>{'Social pages'}</li>
                <li>
                  <Link href={'https://www.facebook.com/PassportPhotosGlobal'}>
                    <a target="_blank">
                      <span className="icon-fb" />
                      {'facebook'}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={'https://www.instagram.com/PassportPhotosGlobal'}>
                    <a target="_blank">
                      <span className="icon-inst" />
                      {'instagram'}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="extra-menu">
        <div className="container">
          <div className="data-wrap">
            <ul>
              <li className="hide-m">
                {`© Copyright ${moment(new Date()).format(
                  'YYYY',
                )}. All rights reserved`}
              </li>
              <li>
                <Link href={PAGES.terms}>
                  <a>{'Privacy Policy'}</a>
                </Link>
              </li>
              <li>
                <Link href={PAGES.terms}>
                  <a>{'Terms of Use'}</a>
                </Link>
              </li>
              <li>
                <Link href={PAGES.shippingPolicy}>
                  <a>{'Shipping policy'}</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="disclaimer">
        <div className="container">
          <div className="data-wrap">
            <p>
              <i className="icon-info" />
              {'Disclaimer: This is not a government site'}
            </p>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="data-wrap">
            <p>{`© Copyright ${moment(new Date()).format(
              'YYYY',
            )}. All rights reserved`}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter
