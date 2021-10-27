import React from 'react';
import Image from 'next/image';
import { PHOTO_STEP } from '../../constants';
import ProcessStepPhoto from '@/components/elements/processStepPhoto';
import Link from 'next/link';

const PhotoStep3: React.FC = () => (
  <div className="steps-page">
    <div className="container">
      <div className="steps-content">
        <div className="step-info">
          <div className="info-toolbar">
            <p>
              <span className="icon-info" />
            </p>
            <button type="button">
              <span className="icon-close" />
            </button>
          </div>
          <div className="info-text">
            <div className="info-wrap">
              <div className="img">
                <Image src="/images/steps/step-03-00.png" width={340} height={326} alt="" />
              </div>
              <div className="text">
                <p>
                  {'Get your perfect biometric photo'}
                  <br />
                  {'(compliance guaranteed)'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="step-data">
          <div className="data-wrap">
            <ProcessStepPhoto step={3} steps={PHOTO_STEP.steps} />

            <div className="title big">
              <h1>{'Success'}</h1>
            </div>
          </div>

          <div className="photo-requirements">
            <div className="requirements-wrap">
              <div className="img">
                <span>
                  <Image src="/images/steps/step-02-03.png" layout={'fill'} alt="" />
                </span>
                <Link href={'/photo/step2'}>
                  <a type="button" className="main-btn no-border">
                    <i className="icon-camera" />
                    {'Change Photo'}
                  </a>
                </Link>
              </div>
              <div className="list">
                <ul>
                  <li>
                    <span className="icon" />
                    <span className="text">{'Image size'}</span>
                  </li>

                  <li>
                    <span className="icon" />
                    <span className="text">{'Image Brightness'}</span>
                  </li>
                  <li>
                    <span className="icon" />
                    <span className="text">{'Width / Height Ratio'}</span>
                  </li>
                  <li>
                    <span className="icon" />
                    <span className="text">{'Image Color Balance'}</span>
                  </li>
                  <li>
                    <span className="icon" />
                    <span className="text">{'Mouth Closed and Not Smiling'}</span>
                  </li>
                  <li>
                    <span className="icon" />
                    <span className="text">{'Correct Had Size'}</span>
                  </li>

                  <li>
                    <span className="icon" />
                    <span className="text">{'Eyes Open'}</span>
                  </li>
                  <li>
                    <span className="icon" />
                    <span className="text">{'Position of Head'}</span>
                  </li>
                  <li>
                    <span className="icon" />
                    <span className="text">{'Eyes Looking Straight Ahead'}</span>
                  </li>
                  <li>
                    <span className="icon" />
                    <span className="text">{'Eye Glasses Not Present'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="data-wrap">
            {/* <div className="btn-wrap single">*/}
            {/*  <div className="action-btn">*/}
            {/*    <button type="button" className="main-btn">*/}
            {/*      <span>{'Try again'}</span>*/}
            {/*    </button>*/}
            {/*  </div>*/}
            {/*  <div className="info-btn">*/}
            {/*    <button type="button" className="main-btn outline">*/}
            {/*      <i className="icon-info" />*/}
            {/*    </button>*/}
            {/*  </div>*/}
            {/* </div>*/}
            <div className="btn-wrap">
              <div className="action-btn">
                <Link href={'/photo/step2'}>
                  <a type="button" className="main-btn outline">
                    <i className="icon-left" />
                    <span>{'Back'}</span>
                  </a>
                </Link>
                <button type="button" className="main-btn">
                  <span>{'Checkout'}</span>
                  <i className="icon-right" />
                </button>
              </div>
              <div className="info-btn">
                <button type="button" className="main-btn outline">
                  <i className="icon-info" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default PhotoStep3;
