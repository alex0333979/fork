import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PAGES, PHOTO_STEP, US_DOCUMENT_ID } from '../../constants';
import ProcessStepPhoto from '@/components/elements/processStepPhoto';
import TakePhotoModal from '@/components/elements/takePhotoModal';
import { UploadPhotoPageProps } from '@/pages/photo/upload-photo';
import { SignedUrl, useGetSignedUrlLazyQuery, useSubmitEntryMutation } from '@/generated/graphql';
import { showError, showSuccess } from '@/lib/utils/toast';
import axios from 'axios';
import { useRouter } from 'next/router';

const PhotoStep2: React.FC<UploadPhotoPageProps> = ({ form, entry, type }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    entry?.form.steps[0].fields.find((f) => f.name === 'image_url')?.value
  );
  const [getSignedUrl, { data: signedUrlResponse, loading: sLoading }] = useGetSignedUrlLazyQuery();
  const [submitEntry] = useSubmitEntryMutation();
  const router = useRouter();
  const cancelTokenSource = axios.CancelToken.source();
  const [percentage, setPercentage] = useState<number>(0);

  const takePhoto = useCallback((file: File) => {
    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file));
    setOpenCamera(false);
  }, []);

  const onFileChange = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  }, []);

  const onRemoveImage = useCallback(() => {
    setImageUrl(undefined);
    setSelectedImage(undefined);
  }, []);

  const onSubmit = useCallback(async () => {
    if (loading || sLoading) {
      return;
    }
    if (entry && imageUrl && !selectedImage) {
      await router.push(`${PAGES.photo.processPhoto}?entryId=${entry.id}`);
      return;
    }
    if (!selectedImage) {
      showError('Select Image first.');
      return;
    }
    getSignedUrl({});
  }, [entry, getSignedUrl, imageUrl, loading, router, sLoading, selectedImage]);

  const createEntry = useCallback(
    async (signedUrl: SignedUrl) => {
      const formStep = form.steps[0];
      if (!formStep) {
        showError('Create Entry Error, formStep not found.');
        return;
      }
      const a: any = { image_url: signedUrl.url, document_id: US_DOCUMENT_ID, number_of_copies: 4 };
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
        variables: { entryId: entry?.id, formId: form.id, formStep }
      });
      setLoading(false);
      const result = data?.SubmitEntry.data;
      if (result) {
        if (entry?.id) {
          showSuccess('Entry image is updated.');
        } else {
          showSuccess('Entry is created.');
        }
        await router.push(`${PAGES.photo.processPhoto}?entryId=${result.id}`);
      }
    },
    [entry?.id, form.id, form.steps, router, submitEntry]
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

  useEffect(() => {
    const data = signedUrlResponse?.GetSignedUrl.data;
    if (data) {
      uploadImageToS3(data);
    }
    return () => undefined;
  }, [signedUrlResponse]);

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
            <div className="instruction-list">
              <ul>
                <li>
                  <div className="img">
                    <span>
                      <Image src="/images/steps/step-02-00.png" layout={'fill'} alt="" />
                    </span>
                  </div>
                  <div className="text">
                    <p>{'Stand in front of a well lit white or light-colored wall'}</p>
                  </div>
                </li>
                <li>
                  <div className="img">
                    <span>
                      <Image src="/images/steps/step-02-01.png" layout={'fill'} alt="" />
                    </span>
                  </div>
                  <div className="text">
                    <p>{'Position Your Head Inside The Green Overlay'}</p>
                  </div>
                </li>
                <li>
                  <div className="img">
                    <span>
                      <Image src="/images/steps/step-02-02.png" layout={'fill'} alt="" />
                    </span>
                  </div>
                  <div className="text">
                    <p>{"When someone's taking a photo of you, a 6 foot (1.8m) distance works."}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="step-data">
            <div className="data-wrap">
              <ProcessStepPhoto step={2} steps={PHOTO_STEP.steps} />
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
                      <span>{imageUrl && <img src={imageUrl} alt="Thumb" />}</span>
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
                <div className="step-tab">
                  <input
                    type="file"
                    hidden
                    accept="image/png"
                    ref={inputFileRef}
                    onChange={onFileChange}
                  />

                  {imageUrl ? (
                    <div className="uploaded-photo">
                      <span>
                        <img src={imageUrl} alt="Thumb" />
                        <button className="icon-close" onClick={onRemoveImage} />
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="title">
                        <h1>{'Take Your Passport Photo'}</h1>
                        <p>{'Get your perfect biometric photo (compliance guaranteed)'}</p>
                      </div>

                      <div className="add-photo">
                        <button
                          type="button"
                          className="main-btn big"
                          onClick={() => setOpenCamera(true)}>
                          <span className="icon-camera" />
                          {'Take A Photo'}
                        </button>
                        <button
                          type="button"
                          className="main-btn big outline"
                          onClick={() => inputFileRef?.current?.click()}>
                          <span className="icon-upload" />
                          {'Upload'}
                        </button>
                      </div>
                    </>
                  )}

                  <div className="btn-wrap">
                    <div className="action-btn">
                      <button
                        type="button"
                        className="main-btn outline"
                        onClick={() => router.push(PAGES.photo.selectType)}>
                        <i className="icon-left" />
                        <span>{'Back'}</span>
                      </button>
                      <button type="button" className="main-btn" onClick={onSubmit}>
                        {'Scan My Photo'} <span className="icon-right" />
                      </button>
                    </div>
                    <div className="info-btn">
                      <button type="button" className="main-btn outline">
                        <i className="icon-info" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
    </div>
  );
};
export default PhotoStep2;
