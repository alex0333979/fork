import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import NavItem from './navItem';
import { PAGES, TOP_MENUS } from '../../constants';
import { useAuth } from '@/lib/auth';

const AppHeader: React.FC = () => {
  const [mobileNavVisible, setMobileNavVisible] = useState<boolean>(false);
  const { cart } = useAuth();

  useEffect(() => {
    if (mobileNavVisible) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }
  }, [mobileNavVisible]);

  return (
    <header>
      <div className="wrapper">
        <div className="toolbar">
          <div className="left-side">
            <div className="logo">
              <Link href={PAGES.home}>
                <a>
                  <Image src="/images/logo.png" alt="" width={147} height={44} />
                </a>
              </Link>
            </div>
            <div className={classNames({ 'main-menu': true, open: mobileNavVisible })}>
              <nav>
                <ul>
                  {TOP_MENUS.map((menu, index) => (
                    <NavItem key={index} title={menu.title} link={menu.link} items={menu.items} />
                  ))}
                </ul>
              </nav>
              {/* <div>*/}
              {/*  <div class="">*/}
              {/*    <button type="button" class="main-btn big">Select a packages</button>*/}
              {/*  </div>*/}
              {/* </div>*/}
            </div>
          </div>
          <div className="right-side">
            <div className="location">
              <div className="current">
                <p>{'United Kingdom'}</p>
              </div>
            </div>
            <div className="user-btn">
              <Link href={PAGES.home}>
                <a>
                  <span className="icon-user" />
                </a>
              </Link>
            </div>
            <div className="cart-btn">
              <Link href={PAGES.cart}>
                <a>
                  <span className="icon-cart" /> {cart?.items?.length ?? 0}
                </a>
              </Link>
            </div>
            <div className="sign-btn">
              <a className="main-btn small blank">{'Sign In'}</a>
            </div>
            <div className={classNames({ 'menu-btn': true, open: mobileNavVisible })}>
              <button type="button" onClick={() => setMobileNavVisible(!mobileNavVisible)}>
                <span className="icon-menu" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
