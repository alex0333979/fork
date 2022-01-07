import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ProcessStepPhoto from '@/components/elements/processStepPhoto';
import { PAGES, PHOTO_STEP } from '../../constants';
import { useRouter } from 'next/router';
import { FACING_MODES } from 'react-html5-camera-photo';
import classNames from 'classnames';
import FaqItem, { FaqItemProps } from '@/components/home/faqItem';
import { SignedUrl, useGetSignedUrlLazyQuery, useSubmitEntryMutation } from '@/generated/graphql';
import axios from 'axios';
import { showError, showSuccess } from '@/lib/utils/toast';
import TakePhotoModal from '@/components/elements/takePhotoModal';
import { TakePhotoPageProps } from '@/pages/photo/take-photo';

const Data: FaqItemProps[] = [
  {
    question: 'Background',
    answer: <p>{'Stand in front of a background that is plain or white and free of shadows'}</p>
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
    answer: (
      <p>
        {'Keep a neutral expression and look directly into the camera with full your face in view'}
      </p>
    )
  },
  {
    question: 'Obstructions',
    answer: (
      <p>
        {
          'Don’t wear glasses, headphones or allow your hair or any other items to obstruct your face'
        }
      </p>
    )
  }
];

const TakePhoto: React.FC<TakePhotoPageProps> = ({ form, entry, documentId }) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>(FACING_MODES.USER);
  const [openStepInfo, setOpenStepInfo] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [getSignedUrl, { data: signedUrlResponse, loading: sLoading }] = useGetSignedUrlLazyQuery({
    fetchPolicy: 'no-cache'
  });
  const [submitEntry] = useSubmitEntryMutation();
  const cancelTokenSource = axios.CancelToken.source();
  const [percentage, setPercentage] = useState<number>(0);

  const onSubmit = useCallback(async () => {
    if (loading || sLoading) {
      return;
    }
    getSignedUrl({});
  }, [loading, sLoading, getSignedUrl]);

  const createEntry = useCallback(
    async (signedUrl: SignedUrl) => {
      const formStep = form.steps[0];
      if (!formStep) {
        showError('Create Entry Error, formStep not found.');
        return;
      }
      const a: any = { image_url: signedUrl.url, document_id: documentId, number_of_copies: 4 };
      Object.keys(a).map((key) => {
        const index = formStep.fields.findIndex((field) => field.name === key);
        if (index === -1) {
          showError(`Create Entry Error, ${key} field not found.`);
          return;
        }
        formStep.fields[index].value = a[key];
      });
      setLoading(true);
      const { data } = await submitEntry({
        variables: { entryId: entry?.id, formId: form.id, formStep },
        fetchPolicy: 'no-cache'
      });
      setLoading(false);
      const result = data?.SubmitEntry.data;
      if (result) {
        if (entry?.id) {
          showSuccess('Entry image is updated.');
        } else {
          showSuccess('Entry is created.');
        }
        await router.push(
          `${PAGES.photo.processPhoto}?entryId=${result.id}&type=${type}&documentId=${documentId}`
        );
      }
    },
    [documentId, entry?.id, form.id, form.steps, router, submitEntry, type]
  );

  const uploadImageToS3 = useCallback(
    (data: SignedUrl) => {
      if (!selectedImage) {
        showError('Select Image first.');
        return;
      }
      const config = {
        cancelToken: cancelTokenSource.token,
        onUploadProgress: (progressEvent: any) => {
          const { loaded, total } = progressEvent;
          setPercentage(Math.round((loaded * 100) / total));
        }
      };
      setLoading(true);
      axios
        .put(data.signedUrl, selectedImage, config)
        .then(async () => {
          setLoading(false);
          showSuccess('File upload success.');
          await createEntry(data);
        })
        .catch((err) => {
          setLoading(false);
          showError(err.message);
        });
    },
    [createEntry, selectedImage]
  );

  const onCancelUploadPhoto = useCallback(() => {
    cancelTokenSource.cancel();
  }, [cancelTokenSource]);

  const takePhoto = useCallback(
    async (file: File) => {
      setSelectedImage(file);
      setOpenCamera(false);
      await onSubmit();
    },
    [onSubmit]
  );

  const onFileChange = useCallback(
    async (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0]);
        await onSubmit();
      }
    },
    [onSubmit]
  );

  useEffect(() => {
    const data = signedUrlResponse?.GetSignedUrl.data;
    if (data) {
      uploadImageToS3(data);
    }
    return () => undefined;
  }, [signedUrlResponse]);

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
              <div className="instruction-list">
                <ul>
                  <li>
                    <div className="img">
                      <span>
                        <Image src="/images/steps/step-02-00-v2.png" layout={'fill'} alt="" />
                      </span>
                    </div>
                    <div className="text">
                      <p>{`Background is uniform, plain, and free of shadows. 
                    Use a neutral expression with eyes clearly visible`}</p>
                    </div>
                  </li>
                  <li>
                    <div className="img">
                      <span>
                        <Image src="/images/steps/step-02-01-v2.png" layout={'fill'} alt="" />
                      </span>
                    </div>
                    <div className="text">
                      <p>{`Position your head inside the green overlay. No glasses allowed. 
                        Your hair or clothing may not obscure your face`}</p>
                    </div>
                  </li>
                  <li>
                    <div className="img">
                      <span>
                        <Image src="/images/steps/step-02-02-v2.png" layout={'fill'} alt="" />
                      </span>
                    </div>
                    <div className="text">
                      <p>{`No uniforms, hats, beanies or other head coverings are allowed, 
                    unless it's for religious reasons`}</p>
                    </div>
                  </li>
                </ul>
              </div>
              {/* <div className="info-text">*/}
              {/*  <div className="info-wrap">*/}
              {/*    <div className="img">*/}
              {/*      <Image src="/images/steps/step-01-00.png" width={332} height={430} alt="" />*/}
              {/*    </div>*/}
              {/*    <div className="text">*/}
              {/*      <h2>{'Verified passport photo using your device'}</h2>*/}
              {/*      <br />*/}
              {/*      <p>{`No need to download an app.`}</p>*/}
              {/*      <br />*/}
              {/*      <p>{`Use your phone or PC.`}</p>*/}
              {/*      <br />*/}
              {/*      <p>{`Our biometric technology verifies Government compliance instantly`}</p>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/* </div>*/}
            </div>
            <div className="step-data">
              <div className="data-wrap">
                <ProcessStepPhoto step={1} steps={PHOTO_STEP.steps} />
                <input
                  type="file"
                  hidden
                  accept="image/png"
                  ref={inputFileRef}
                  onChange={onFileChange}
                />
                {loading || sLoading ? (
                  <div className="step-tab">
                    <div className="uploading-progress">
                      <div className="sub-title">
                        <h3>{'Please wait...'}</h3>
                      </div>
                      <div className="progress-line">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                          <circle
                            cx="24"
                            cy="24"
                            r="22.5"
                            fill="transparent"
                            strokeWidth="3"
                            strokeDasharray={`${(percentage * 295) / 100}%,1000`}
                            strokeDashoffset="0"
                          />
                        </svg>
                        <span>
                          {selectedImage && (
                            <img src={URL.createObjectURL(selectedImage)} alt="Thumb" />
                          )}
                        </span>
                      </div>
                      <div className="text">
                        <p>{`${percentage}%`}</p>
                      </div>
                    </div>
                    <div className="btn-wrap single">
                      <div className="action-btn">
                        <button
                          type="button"
                          className="main-btn no-border"
                          onClick={onCancelUploadPhoto}>
                          {'Cancel'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
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
                    <div className="btn-wrap">
                      <div className="action-btn mobile-column">
                        <button
                          type="button"
                          className="main-btn big outline"
                          onClick={() => inputFileRef?.current?.click()}>
                          <span className="icon-upload" />
                          {'Upload'}
                        </button>
                        <button
                          type="button"
                          className="main-btn big"
                          onClick={() => setOpenCamera(true)}>
                          <span className="icon-camera" />
                          {'Take A Photo'}
                        </button>
                      </div>
                      {/* <div className="info-btn">*/}
                      {/*  <button*/}
                      {/*    type="button"*/}
                      {/*    className="main-btn outline"*/}
                      {/*    onClick={() => setOpenStepInfo(true)}>*/}
                      {/*    <i className="icon-info" />*/}
                      {/*  </button>*/}
                      {/* </div>*/}
                    </div>
                  </>
                )}
                <div className="info-link">
                  <span>{'How to take a photo'}</span>
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
      <TakePhotoModal
        open={openCamera}
        idealFacingMode={type}
        closeTakePhoto={() => setOpenCamera(false)}
        takePhoto={takePhoto}
      />
    </>
  );
};
export default TakePhoto;
