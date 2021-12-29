import React, { useState } from 'react';
import Image from 'next/image';
import ProcessStepPhoto from '@/components/elements/processStepPhoto';
import { PAGES, PHOTO_STEP } from '../../constants';
import { useRouter } from 'next/router';
import { FACING_MODES } from 'react-html5-camera-photo';
import classNames from 'classnames';
import FaqItem, { FaqItemProps } from '@/components/home/faqItem';
import { SelectTypePageProps } from '@/pages/photo/select-type';

const Data: FaqItemProps[] = [
  {
    question: 'Background',
    answer: <p>{'Position your head inside the green overlay'}</p>
  },
  {
    question: 'Head Position',
    answer: (
      <>
        <p>{'Position your head inside the green overlay'}</p>
        <div className="img-list">
          <span>
            <Image src="/images/steps/step-faq-01.png" layout={'fill'} alt="" />
          </span>
          <span>
            <Image src="/images/steps/step-faq-02.png" layout={'fill'} alt="" />
          </span>
          <span>
            <Image src="/images/steps/step-faq-03.png" layout={'fill'} alt="" />
          </span>
        </div>
      </>
    )
  },
  {
    question: 'Facial Expression',
    answer: <p>{'Position your head inside the green overlay'}</p>
  },
  {
    question: 'Obstructions',
    answer: <p>{'Position your head inside the green overlay'}</p>
  }
];

const SelectType: React.FC<SelectTypePageProps> = ({ documentId }) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>(FACING_MODES.USER);
  const [openStepInfo, setOpenStepInfo] = useState<boolean>(false);

  return (
    <>
      <div className="steps-page">
        <div className="container">
          <div className="steps-content">
            <div className={classNames('step-info', { open: openStepInfo })}>
              <div className="info-toolbar">
                <p>
                  <span className="icon-info" />
                </p>
                <button type="button" onClick={() => setOpenStepInfo(false)}>
                  <span className="icon-close" />
                </button>
              </div>
              <div className="info-text">
                <div className="info-wrap">
                  <div className="img">
                    <Image src="/images/steps/step-01-00.png" width={332} height={430} alt="" />
                  </div>
                  <div className="text">
                    <h2>{'Verified passport photo using your device'}</h2>
                    <br />
                    <p>{`No need to download an app.`}</p>
                    <br />
                    <p>{`Use your phone or PC.`}</p>
                    <br />
                    <p>{`Our biometric technology verifies Government compliance instantly`}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="step-data">
              <div className="data-wrap">
                <ProcessStepPhoto step={1} steps={PHOTO_STEP.steps} />

                <div className="title">
                  <h1>{'Taking your shot on your own or having someone take it for you?'}</h1>
                  <p>{'Select from the options below'}</p>
                </div>
                <div className="method-option">
                  <label>
                    <input
                      type="radio"
                      name="method"
                      checked={type === FACING_MODES.USER}
                      hidden
                      onChange={() => setType(FACING_MODES.USER)}
                      onClick={() =>
                        router.push(
                          `${PAGES.photo.uploadPhoto}?type=${FACING_MODES.USER}&documentId=${documentId}`
                        )
                      }
                    />
                    <span className="option-wrap">
                      <span className="bullet" />
                      <span className="img">
                        <Image src="/images/steps/step-01-01-v2.png" layout={'fill'} alt="" />
                      </span>
                      <span className="name">{`I'll take a selfie`}</span>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="method"
                      checked={type === FACING_MODES.ENVIRONMENT}
                      hidden
                      onChange={() => setType(FACING_MODES.ENVIRONMENT)}
                      onClick={() =>
                        router.push(
                          `${PAGES.photo.uploadPhoto}?type=${FACING_MODES.ENVIRONMENT}&documentId=${documentId}`
                        )
                      }
                    />
                    <span className="option-wrap">
                      <span className="bullet" />
                      <span className="img">
                        <Image src="/images/steps/step-01-02-v2.png" layout={'fill'} alt="" />
                      </span>
                      <span className="name">{`Someone’s taking my photo`}</span>
                    </span>
                  </label>
                </div>
                <div className="btn-wrap single">
                  <div className="action-btn">
                    <button
                      type="button"
                      className="main-btn"
                      onClick={() =>
                        router.push(
                          `${PAGES.photo.uploadPhoto}?type=${type}&documentId=${documentId}`
                        )
                      }>
                      <span>{'Next'}</span>
                      <i className="icon-right" />
                    </button>
                  </div>
                  <div className="info-btn">
                    <button
                      type="button"
                      className="main-btn outline"
                      onClick={() => setOpenStepInfo(true)}>
                      <i className="icon-info" />
                    </button>
                  </div>
                </div>
                <div className="info-link">
                  <span onClick={() => setOpen(true)}>{'How to take a photo'}</span>
                </div>
                <div className="faq-section">
                  <div className="faq-list">
                    <ul>
                      {Data.map((item, index) => (
                        <FaqItem key={index} answer={item.answer} question={item.question} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames('modal-wrap doc-type', { open })}>
        <div className="overlay" />
        <div className="close-modal">
          <div className="modal-content">
            <div className="close-btn">
              <button type="button" onClick={() => setOpen(false)}>
                <span className="icon-close" />
              </button>
            </div>
            <div className="content-scroll">
              <div className="youtube-video" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SelectType;
