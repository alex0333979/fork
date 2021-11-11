import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PAGES } from '../../constants';

const MainIntro: React.FC = () => {
  const router = useRouter();

  return (
    <div className="main-intro">
      <div className="container">
        <div className="intro-wrap">
          <div className="intro-title">
            <div className="title big">
              <h1>
                <b>
                  {/*
                  {'Hey '}
                  <span className="emoji-wrap">
                    <Image src="/images/emoji/waving.png" width={40} height={40} alt="" />
                  </span>
                  */}
                  {'Take your us '}
                  <span className="emoji-wrap">
                    <Image src="/images/emoji/british-flag.png" width={40} height={40} alt="" />
                  </span>
                  {'passport photo with your device.'}
                  <br />
                </b>
              </h1>
              <ul>
                <li>{'Technology That Guarantees Full Government Compliance'}</li>
                <li>{'100% Online - Printed at Home or Shipped Straight To'}</li>
                <li>{'Unlimited Revisions: Your Passport Photo, Your Way'}</li>
                <li>{'Verified, Secure & Simple'}</li>
              </ul>
            </div>
            <div className="btn-wrap">
              <button
                type="button"
                className="main-btn big"
                onClick={() => router.push(PAGES.photo.selectType)}>
                {'Start now'}
              </button>
            </div>
          </div>
          <div className="intro-img">
            <span>
              <Image src="/images/intro-01.png" width={661} height={670} alt="" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainIntro;
