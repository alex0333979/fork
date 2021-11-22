import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PAGES } from '../../constants';

const AppFooter: React.FC = () => (
  <footer>
    <div className="additional-menu">
      <div className="container">
        <div className="data-wrap">
          <div className="logo">
            <Link href={'/'}>
              <a>
                <Image src="/images/logo1.png" alt="" width={431} height={132} />
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
                <Link href={'/'}>
                  <a>{'FAQ'}</a>
                </Link>
              </li>
            </ul>
            <ul>
              <li>{'About us'}</li>
              <li>
                <Link href={'/'}>
                  <a>{'About'}</a>
                </Link>
              </li>
              <li>
                <Link href={'/'}>
                  <a>{'Contact Us'}</a>
                </Link>
              </li>
            </ul>
            <ul>
              <li>{'Social pages'}</li>
              <li>
                <a target="_blank">
                  <span className="icon-fb" />
                  {'facebook'}
                </a>
              </li>
              <li>
                <a target="_blank">
                  <span className="icon-yt" />
                  {'youtube'}
                </a>
              </li>
              <li>
                <a target="_blank">
                  <span className="icon-inst" />
                  {'instagram'}
                </a>
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
            <li className="hide-m">{'© Copyright 2021. All rights reserved'}</li>
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
            <li>
              <Link href={'/'}>
                <a>{'Call us'}</a>
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
          <p>{'© Copyright 2021. All rights reserved'}</p>
        </div>
      </div>
    </div>
  </footer>
);

export default AppFooter;
