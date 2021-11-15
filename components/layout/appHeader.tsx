import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import NavItem from './navItem';
import { PAGES, TOP_MENUS } from '../../constants';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';
import { Country, useCountriesQuery } from '@/generated/graphql';
import axios from 'axios';

const AppHeader: React.FC = () => {
  const [mobileNavVisible, setMobileNavVisible] = useState<boolean>(false);
  const { cart, isAuthenticated, signOut } = useAuth();
  const router = useRouter();
  const { data } = useCountriesQuery();
  const countries = useMemo(() => data?.Countries?.data, [data?.Countries?.data]);
  const [country, setCountry] = useState<Country | undefined>(undefined);
  const [openCountry, setOpenCountry] = useState<boolean>(false);

  const getGeoInfo = useCallback(() => {
    axios
      .get('https://ipapi.co/json/')
      .then((response) => {
        const data = response.data;
        for (const c of countries ?? []) {
          if (c.country.toLowerCase() === data.country_name.toLowerCase()) {
            setCountry(c);
            break;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [countries]);

  useEffect(() => {
    getGeoInfo();
  }, [getGeoInfo]);

  const logout = useCallback(async () => {
    signOut();
    await router.push(PAGES.home);
  }, [router, signOut]);

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
                <p onClick={() => setOpenCountry(!openCountry)}>
                  {country?.country ?? 'United States'}
                </p>
              </div>
              <div className={classNames('drop-item', { open: openCountry })}>
                <ul>
                  {countries?.map((item, index) => (
                    <li key={index}>
                      <a
                        onClick={() => {
                          setCountry(item);
                          setOpenCountry(false);
                        }}>
                        {item.country}
                      </a>
                    </li>
                  ))}
                </ul>
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
            {isAuthenticated ? (
              <div className="sign-btn">
                <button type="button" className="main-btn small blank" onClick={logout}>
                  {'Sign Out'}
                </button>
              </div>
            ) : (
              <div className="sign-btn">
                <button type="button" className="main-btn small blank">
                  {'Sign In'}
                </button>
              </div>
            )}
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
