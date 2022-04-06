/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, NextRouter } from 'next/router';
import classNames from 'classnames';
import { parse } from 'path';

import { PAGES, PHOTO_STEP } from '@/constants/index';
import ProcessStepPhoto from '@/components/elements/processStepPhoto';
import LoadingMask from '@/components/elements/loadingMask';
import { Code, Dictionary, Entry, Country, useCheckPhotoMutation } from '@/generated/graphql';
import { showError } from '@/lib/utils/toast';

import StepInfo from './components/stepInfo';
import TestCase from './components/testCase';
import { ProcessingStatus } from './types';

interface Props {
  entry?: Entry;
  type: string;
  imgRes: string;
  photoUrl?: string;
  document?: Country;
  showStep?: boolean;
  onCheckout?: (imageLink: string) => void;
  onChangePhoto: () => void;
  renderTitle: (status: ProcessingStatus) => React.ReactNode;
  renderRetakeButton: (
    status: ProcessingStatus,
    router: NextRouter,
    onOpenInfo: (v: boolean) => void,
    imageLink: string
  ) => React.ReactNode;
}

const VerifyPhoto: React.FC<Props> = ({
  entry,
  photoUrl,
  type,
  imgRes,
  document,
  showStep,
  onCheckout,
  renderTitle,
  renderRetakeButton
}) => {
  const router = useRouter();
  const [checkPhoto] = useCheckPhotoMutation();
  const [status, setStatus] = useState<ProcessingStatus>(ProcessingStatus.notStarted);
  const [failed, setFailed] = useState<Dictionary[]>([]);
  const [passed, setPassed] = useState<Dictionary[]>([]);
  const [openStepInfo, setOpenStepInfo] = useState<boolean>(false);

  const imageUrl = useMemo(
    () => entry?.form.steps[0].fields.find((f) => f.name === 'image_url')?.value || photoUrl,
    [entry?.form.steps, photoUrl]
  );

  const imageLink = useMemo<string>(() => {
    if (imageUrl) {
      return status === ProcessingStatus.success
        ? `${parse(imageUrl).dir}/${parse(imageUrl).name}_watermark${parse(imageUrl).ext}`
        : imageUrl;
    } else {
      return '/images/steps/step-02-03.png';
    }
  }, [imageUrl, status]);

  const processPhoto = useCallback(async () => {
    if (!entry?.id) return;

    setStatus(ProcessingStatus.loading);
    const userAgent = navigator.userAgent;
    const { data } = await checkPhoto({
      variables: { entryId: entry.id, userAgent, imageResolution: imgRes },
      fetchPolicy: 'no-cache'
    });
    const result = data?.CheckPhoto.data;
    if (result) {
      if (result.code === Code.Code200) {
        setStatus(ProcessingStatus.success);
      } else {
        setStatus(ProcessingStatus.failed);
      }
      setFailed(result.failed ?? []);
      setPassed(result.passed ?? []);
    } else {
      showError(data?.CheckPhoto.message ?? 'Unexpected error');
      setStatus(ProcessingStatus.failed);
    }
  }, [checkPhoto, entry?.id, imgRes]);

  const onChangePhoto = useCallback(() => {
    if (entry?.id && document?.id) {
      router.push(
        `${PAGES.photo.takePhoto}?entryId=${entry.id}&type=${type}&documentId=${document.id}`
      );
    } else {
      router.push(PAGES.photo.takeNewPhoto);
    }
  }, [document?.id, entry?.id, router, type]);

  useEffect(() => {
    (async () => processPhoto())();
    return () => undefined;
  }, [processPhoto]);

  return (
    <>
      {status === ProcessingStatus.loading && <LoadingMask />}
      <div className="steps-page">
        <div className="container">
          <div className="steps-content">
            <StepInfo
              status={status}
              openInfo={openStepInfo}
              onOpenInfo={(v: boolean) => setOpenStepInfo(v)}
            />
            <div className="step-data">
              <div className="data-wrap">
                {showStep && (
                  <ProcessStepPhoto
                    step={status === ProcessingStatus.success ? 3 : 2}
                    steps={PHOTO_STEP.steps}
                  />
                )}
                <div className="title big">
                  <h1>{renderTitle(status)}</h1>
                </div>
              </div>

              <div className="photo-requirements">
                <div
                  className={classNames('requirements-wrap', {
                    failed: status === ProcessingStatus.failed
                  })}>
                  <div className="img">
                    <span>
                      <img src={imageLink} alt="" />
                    </span>
                    {status === ProcessingStatus.success && onCheckout && (
                      <button
                        type="button"
                        className="main-btn"
                        onClick={() => onCheckout(imageLink)}>
                        Proceed To Checkout
                      </button>
                    )}
                    <button type="button" className="main-btn no-border" onClick={onChangePhoto}>
                      <i className="icon-camera" />
                      Change Photo
                    </button>
                  </div>
                  <TestCase status={status} passed={passed} failed={failed} />
                </div>
              </div>

              <div className="data-wrap">
                {renderRetakeButton(status, router, setOpenStepInfo, imageLink)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VerifyPhoto;
