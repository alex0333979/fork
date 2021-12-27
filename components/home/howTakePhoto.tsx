import React from 'react';
import Image from 'next/image';

const HowTakePhoto: React.FC = () => (
  <div className="faq-section">
    <div className="container">
      <div className="data-wrap">
        <div className="sub-title">
          <h2>{'How To Take A Photo'}</h2>
          <p>{'Biometrically Approved Photos'}</p>
        </div>
        <div className="faq-list">
          <ul>
            <li className="">
              <div className="question">
                <h3>{'Background'}</h3>
              </div>
              <div className="advice">
                <div className="img">
                  <span>
                    <Image src="/images/faq/faq-01.png" width={27} height={27} alt="" />
                  </span>
                </div>
                <div className="text">
                  <p>{'For the DS-82 and DS-64 forms, you must sign'}</p>
                </div>
              </div>
            </li>
            <li>
              <div className="question">
                <h3>{'Head Position'}</h3>
              </div>
              <div className="advice">
                <div className="img">
                  <span>
                    <Image src="/images/faq/faq-02.png" width={27} height={27} alt="" />
                  </span>
                </div>
                <div className="text">
                  <p>{'For the DS-82 and DS-64 forms, you must sign'}</p>
                </div>
              </div>
            </li>
            <li>
              <div className="question">
                <h3>Facial Expression</h3>
              </div>
              <div className="advice">
                <div className="img">
                  <span>
                    <Image src="/images/faq/faq-03.png" width={27} height={27} alt="" />
                  </span>
                </div>
                <div className="text">
                  <p>{'For the DS-82 and DS-64 forms, you must sign'}</p>
                </div>
              </div>
            </li>
            <li>
              <div className="question">
                <h3>{'Obstructions'}</h3>
              </div>
              <div className="advice">
                <div className="img">
                  <span>
                    <Image src="/images/faq/faq-04.png" width={27} height={27} alt="" />
                  </span>
                </div>
                <div className="text">
                  <p>{'For the DS-82 and DS-64 forms, you must sign'}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default HowTakePhoto;
