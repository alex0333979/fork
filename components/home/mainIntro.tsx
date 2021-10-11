import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MainIntro: React.FC = () => (
  <div className="main-intro">
    <div className="container">
      <div className="intro-wrap">
        <div className="intro-title">
          <div className="title big">
            <h1>
              <b>
                {'Hello '}
                <span className="emoji-wrap">
                  <Image src="/images/emoji/waving.png" width={40} height={40} alt="" />
                </span>
                {' take your passport photo'}
                <br />
                {'from UK '}
                <span className="emoji-wrap">
                  <Image src="/images/emoji/british-flag.png" width={40} height={40} alt="" />
                </span>
              </b>
            </h1>
            <ul>
              <li>{'Your passport photo, your way'}</li>
              <li>{'Photos & applications, all in one place'}</li>
              <li>{'Ship directly to your home or print them yourself'}</li>
              <li>{'Verified, secure & simple'}</li>
            </ul>
          </div>
          <div className="btn-wrap">
            <Link href={'/application/create'}>
              <a className="main-btn big">{'Start now'}</a>
            </Link>
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

export default MainIntro;
