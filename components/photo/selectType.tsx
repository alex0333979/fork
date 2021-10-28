import React, { useState } from 'react';
import Image from 'next/image';
import ProcessStepPhoto from '@/components/elements/processStepPhoto';
import { PHOTO_STEP } from '../../constants';
import Link from 'next/link';

const SelectType: React.FC = () => {
  const [type, setType] = useState<string>('selfie');

  return (
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
                  <Image src="/images/steps/step-01-00.png" width={332} height={430} alt="" />
                </div>
                <div className="text">
                  <p>
                    {'Get your perfect biometric photo'}
                    <br /> {'(compliance guaranteed)'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="step-data">
            <div className="data-wrap">
              <ProcessStepPhoto step={1} steps={PHOTO_STEP.steps} />

              <div className="title">
                <h1>
                  {'You can do passport photos'}
                  <br />
                  {' on your computer or phone'}
                </h1>
                <p>{'Get your perfect biometric photo (compliance guaranteed)'}</p>
              </div>
              <div className="method-option">
                <label>
                  <input
                    type="radio"
                    name="method"
                    checked={type === 'selfie'}
                    hidden
                    onChange={() => setType('selfie')}
                  />
                  <span className="option-wrap">
                    <span className="bullet" />
                    <span className="img">
                      <Image src="/images/steps/step-01-01.png" layout={'fill'} alt="" />
                    </span>
                    <span className="name">{`I'll take a selfie`}</span>
                  </span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="method"
                    checked={type === 'take_photo'}
                    hidden
                    onChange={() => setType('take_photo')}
                  />
                  <span className="option-wrap">
                    <span className="bullet" />
                    <span className="img">
                      <Image src="/images/steps/step-01-02.png" layout={'fill'} alt="" />
                    </span>
                    <span className="name">{'Another will take a photo'}</span>
                  </span>
                </label>
              </div>
              <div className="btn-wrap single">
                <div className="action-btn">
                  <Link href={'/photo/upload-photo'}>
                    <a type="button" className="main-btn">
                      <span>{'Next'}</span>
                      <i className="icon-right" />
                    </a>
                  </Link>
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
};
export default SelectType;
