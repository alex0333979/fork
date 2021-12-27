import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PAGES } from '../../constants';
import { useMediaQuery } from '@react-hook/media-query';

const MainIntro = (props: any, ref: any) => {
  const router = useRouter();
  const matches = useMediaQuery('only screen and (min-width: 641px)');

  return (
    <div className="main-intro" ref={ref}>
      <div className="container">
        <div className="intro-wrap mobile-img">
          <div className="intro-title">
            <div className="title big">
              <h1>
                <b>{'Passport and Visa Photos Online'}</b>
              </h1>
              <p>{'Get your perfect biometric photo (compliance guaranteed)'}</p>
            </div>
            <div className="select-country">
              <div className="form-fields">
                <label>
                  <span className="label">{'What country is this for?'}</span>
                  <span className="field select">
                    <select>
                      <option disabled defaultChecked>
                        {'Select country'}
                      </option>
                      <option>{'United States'}</option>
                      <option>{'United States'}</option>
                      <option>{'United States'}</option>
                    </select>
                  </span>
                </label>
              </div>
              <div className="submit-btn">
                <a className="main-btn big" onClick={() => router.push(PAGES.photo.selectType)}>
                  {'Choose document'}
                </a>
              </div>
            </div>
          </div>
          <div className="intro-img">
            <div className="country-flag">
              <Image src={'/images/emoji/british-flag.png'} width={40} height={40} alt="" />
            </div>
            <span>
              <picture>
                {matches ? (
                  <Image src={'/images/intro-01.png'} width={737} height={747} alt={''} />
                ) : (
                  <Image src={'/images/intro-01-3-m.png'} width={271} height={254} alt="" />
                )}
              </picture>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(MainIntro);
