import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import NavItem from './navItem';
import { PAGES, TOP_MENUS } from '../../constants';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';

const AppHeader: React.FC = () => {
  const router = useRouter();
  const [mobileNavVisible, setMobileNavVisible] = useState<boolean>(false);
  const { cart } = useAuth();

  // const logout = useCallback(async () => {
  //   signOut();
  //   await router.push(PAGES.home);
  // }, [router, signOut]);

  // const onSelectedCountry = useCallback((country: Country) => {
  //   console.log(country);
  // }, []);

  const onClickCart = useCallback(async () => {
    if (cart?.items?.length ?? 0 > 0) {
      await router.push(PAGES.cart);
    } else {
      await router.push(PAGES.photo.index);
    }
  }, [cart?.items?.length, router]);

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
                  <Image src="/images/logo1.png" alt="" width={450} height={141} />
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
                <p>{'United States'}</p>
              </div>
            </div>
            {/* <SelectCountry selectedCountry={onSelectedCountry} />*/}
            {/* <div className="user-btn">*/}
            {/*  <Link href={PAGES.home}>*/}
            {/*    <a>*/}
            {/*      <span className="icon-user" />*/}
            {/*    </a>*/}
            {/*  </Link>*/}
            {/* </div>*/}
            <div className="cart-btn">
              <a onClick={onClickCart}>
                <span className="icon-cart" /> {cart?.items?.length ?? 0}
              </a>
            </div>
            <div className="sign-btn">
              <button
                type="button"
                className="main-btn small"
                onClick={() => router.push(PAGES.photo.index)}>
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
