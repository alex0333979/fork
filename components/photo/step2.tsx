import React from 'react';
import Image from 'next/image';
import { PHOTO_STEP } from '../../constants';
import ProcessStepPhoto from '@/components/elements/processStepPhoto';
import Link from 'next/link';

const PhotoStep2: React.FC = () => (
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
          <div className="instruction-list">
            <ul>
              <li>
                <div className="img">
                  <span>
                    <Image src="/images/steps/step-02-00.png" width={200} height={200} alt="" />
                  </span>
                </div>
                <div className="text">
                  <p>
                    {'Get your perfect biometric'}
                    <br /> {'photo(compliance guaranteed)'}
                  </p>
                </div>
              </li>
              <li>
                <div className="img">
                  <span>
                    <Image src="/images/steps/step-02-01.png" width={200} height={200} alt="" />
                  </span>
                </div>
                <div className="text">
                  <p>
                    {'Get your perfect biometric'}
                    <br /> {'photo(compliance guaranteed)'}
                  </p>
                </div>
              </li>
              <li>
                <div className="img">
                  <span>
                    <Image src="/images/steps/step-02-02.png" width={200} height={200} alt="" />
                  </span>
                </div>
                <div className="text">
                  <p>
                    {'Get your perfect biometric'}
                    <br /> {'photo(compliance guaranteed)'}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="step-data">
          <div className="data-wrap">
            <ProcessStepPhoto step={2} steps={PHOTO_STEP.steps} />

            <div className="step-tab">
              <div className="title">
                <h1>{'Take Your Passport Photo'}</h1>
                <p>{'Get your perfect biometric photo (compliance guaranteed)'}</p>
              </div>

              <div className="add-photo">
                <button type="button" className="main-btn big outline">
                  <span className="icon-camera" />
                  {'Take A Photo'}
                </button>
                <button type="button" className="main-btn big">
                  <span className="icon-upload" />
                  {'Upload'}
                </button>
              </div>

              <div className="btn-wrap">
                <div className="action-btn">
                  <Link href={'/photo/step1'}>
                    <a type="button" className="main-btn outline">
                      <i className="icon-left" />
                      <span>{'Back'}</span>
                    </a>
                  </Link>
                  <button type="button" className="main-btn">
                    <span>{'Next'}</span>
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
  </div>
);
export default PhotoStep2;
