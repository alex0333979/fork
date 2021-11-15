import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import NavItem from './navItem';
import { PAGES, TOP_MENUS } from '../../constants';
import { useAuth } from '@/lib/auth';
import SelectCountry from '@/components/layout/selectCountry';
import { Country } from '@/generated/graphql';

const AppHeader: React.FC = () => {
  const [mobileNavVisible, setMobileNavVisible] = useState<boolean>(false);
  const { cart } = useAuth();

  // const logout = useCallback(async () => {
  //   signOut();
  //   await router.push(PAGES.home);
  // }, [router, signOut]);

  const onSelectedCountry = useCallback((country: Country) => {
    console.log(country);
  }, []);

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
                  <Image src="/images/logo1.png" alt="" width={431} height={132} />
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
            <SelectCountry selectedCountry={onSelectedCountry} />
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
