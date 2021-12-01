import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PhotoHeader: React.FC = () => (
  <header>
    <div className="steps-header">
      <div className="container">
        <div className="toolbar">
          <div className="left-side">
            <div className="logo">
              <Link href={'/'}>
                <a>
                  <Image src="/images/logo.svg" alt="" width={450} height={141} />
                </a>
              </Link>
            </div>
          </div>
          <div className="right-side">
            <div className="steps-advantages">
              <ul>
                <li>
                  <span className="icon-government" />
                  {'Government Complaint'}
                </li>
                <li>
                  <span className="icon-safe" />
                  {'Your Data Is Secure'}
                </li>
                <li>
                  <span className="icon-revisions" />
                  {'Unlimited Revisions'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);
export default PhotoHeader;
