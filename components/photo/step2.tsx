import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PHOTO_STEP } from '../../constants';
import ProcessStepPhoto from '@/components/elements/processStepPhoto';
import Link from 'next/link';
import TakePhotoModal from '@/components/elements/takePhotoModal';
import { PhotoStep2PageProps } from '@/pages/photo/step2';
import { SignedUrl, useGetSignedUrlLazyQuery } from '@/generated/graphql';
import { showError } from '@/lib/utils/toast';
import { Bars } from 'react-loading-icons';
import axios from 'axios';

const PhotoStep2: React.FC<PhotoStep2PageProps> = ({ form }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [getSignedUrl, { data: signedUrlResponse }] = useGetSignedUrlLazyQuery();

  const takePhoto = useCallback((file: File) => {
    setSelectedImage(file);
    setOpenCamera(false);
  }, []);

  const onFileChange = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  }, []);

  const onSubmit = useCallback(async () => {
    if (!selectedImage) {
      showError('Select Image first.');
      return;
    }
    setLoading(true);
    getSignedUrl({});
    setLoading(false);
  }, [getSignedUrl, selectedImage]);

  const uploadImageToS3 = useCallback(
    (data: SignedUrl) => {
      const options = {
        params: {
          Key: selectedImage?.name ?? 'photo',
          ContentType: selectedImage?.type ?? 'png'
        },
        headers: {
          'Content-Type': selectedImage?.type ?? 'png'
        }
      };
      setLoading(true);
      axios
        .put(data.signedUrl, selectedImage, options)
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    },
    [selectedImage]
  );

  useEffect(() => {
    console.log(signedUrlResponse);
    const data = signedUrlResponse?.GetSignedUrl.data;
    if (data) {
      uploadImageToS3(data);
    }
  }, [signedUrlResponse, uploadImageToS3]);

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
                    <p>
                      {'Get your perfect biometric'}
                      <br /> {'photo(compliance guaranteed)'}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="img">
                    <span>
                      <Image src="/images/steps/step-02-01.png" layout={'fill'} alt="" />
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
                      <Image src="/images/steps/step-02-02.png" layout={'fill'} alt="" />
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
                  <input
                    type="file"
                    hidden
                    accept="image/png"
                    ref={inputFileRef}
                    onChange={onFileChange}
                  />
                  {selectedImage ? (
                    <div className="preview-image">
                      <img src={URL.createObjectURL(selectedImage)} alt="Thumb" />
                      <button className="close-button" onClick={() => setSelectedImage(undefined)}>
                        <span className="icon-close" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="main-btn big outline"
                        onClick={() => setOpenCamera(true)}>
                        <span className="icon-camera" />
                        {'Take A Photo'}
                      </button>
                      <button
                        type="button"
                        className="main-btn big"
                        onClick={() => inputFileRef?.current?.click()}>
                        <span className="icon-upload" />
                        {'Upload'}
                      </button>
                    </>
                  )}
                </div>

                <div className="btn-wrap">
                  <div className="action-btn">
                    <Link href={'/photo/step1'}>
                      <a type="button" className="main-btn outline">
                        <i className="icon-left" />
                        <span>{'Back'}</span>
                      </a>
                    </Link>
                    <button type="button" className="main-btn" onClick={onSubmit}>
                      {loading ? (
                        <Bars height={25} fill={'#FFFFFF'} stroke={'transparent'} />
                      ) : (
                        <>
                          {'Next'} <span className="icon-right" />
                        </>
                      )}
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
      <TakePhotoModal
        open={openCamera}
        closeTakePhoto={() => setOpenCamera(false)}
        takePhoto={takePhoto}
      />
    </div>
  );
};
export default PhotoStep2;
