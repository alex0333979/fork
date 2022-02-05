import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { CHECKLIST, PAGES, PHOTO_STEP } from '../../constants';
import ProcessStepPhoto from '@/components/elements/processStepPhoto';
import { ProcessPhotoProps } from '@/pages/photo/process-photo';
import { useRouter } from 'next/router';
import {
  CartItemInput,
  Code,
  Dictionary,
  ProductType,
  useAddItemsToCartMutation,
  useCheckPhotoMutation
} from '@/generated/graphql';
import classNames from 'classnames';
import { showError, showSuccess } from '@/lib/utils/toast';
import { Bars } from 'react-loading-icons';
import { camelCaseToSentence } from '@/lib/utils/string';
import { parse } from 'path';
import { useAuth } from '@/lib/auth';
import LoadingMask from '@/components/elements/loadingMask';
import { Link } from '@material-ui/core';

enum Status {
  loading = 0,
  success = 1,
  failed = 2
}

const ProcessPhoto: React.FC<ProcessPhotoProps> = ({ entry, type, document }) => {
  const router = useRouter();
  const { updateCart } = useAuth();
  const [addToCart] = useAddItemsToCartMutation();
  const [checkPhoto] = useCheckPhotoMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>(Status.loading);
  const [failed, setFailed] = useState<Dictionary[]>([]);
  const [passed, setPassed] = useState<Dictionary[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openStepInfo, setOpenStepInfo] = useState<boolean>(false);

  const imageUrl = useMemo(
    () => entry.form.steps[0].fields.find((f) => f.name === 'image_url')?.value,
    [entry.form.steps]
  );

  const imageLink = useMemo<string>(() => {
    if (imageUrl) {
      return status === Status.success
        ? `${parse(imageUrl).dir}/${parse(imageUrl).name}_watermark${parse(imageUrl).ext}`
        : imageUrl;
    } else {
      return '/images/steps/step-02-03.png';
    }
  }, [imageUrl, status]);

  const processPhoto = useCallback(async () => {
    setStatus(Status.loading);
    const { data } = await checkPhoto({
      variables: { entryId: entry.id },
      fetchPolicy: 'no-cache'
    });
    const result = data?.CheckPhoto.data;
    if (result) {
      if (result.code === Code.Code200) {
        setStatus(Status.success);
      } else {
        setStatus(Status.failed);
      }
      setFailed(result.failed ?? []);
      setPassed(result.passed ?? []);
    } else {
      showError(data?.CheckPhoto.message ?? 'Unexpected error');
      setStatus(Status.failed);
    }
  }, [checkPhoto, entry.id]);

  const onAddToCartItem = useCallback(
    async (cartItem: CartItemInput) => {
      setLoading(true);
      const { data } = await addToCart({
        variables: {
          cartItems: [cartItem]
        }
      });
      setLoading(false);
      const cart = data?.AddItemsToCart.data;
      if (cart) {
        updateCart(cart);
        showSuccess('This entry is added to cart.');
        if (document.id === 495 || document.id === 489) {
          // only for US passport and UK passport
          setOpen(true);
          // await router.push(PAGES.upSell);
          // await router.push(PAGES.cart);
        } else {
          await router.push(PAGES.cart);
        }
      }
    },
    [addToCart, document.id, router, updateCart]
  );

  const goNext = useCallback(async () => {
    await onAddToCartItem({
      name: `${document.country} - ${document.type}`,
      description: `${document.type} Photos`,
      product: ProductType.PassportPhoto,
      productId: entry.id,
      imageUrl: imageLink
    });
  }, [document, entry.id, imageLink, onAddToCartItem]);

  const goApplication = useCallback(async () => {
    setOpen(false);
    await router.push(PAGES.application.create);
  }, [router]);

  const goCart = useCallback(async () => {
    setOpen(false);
    await router.push(PAGES.cart);
  }, [router]);

  useEffect(() => {
    (async () => processPhoto())();
    return () => undefined;
  }, [processPhoto]);

  return (
    <>
      {status === Status.loading && <LoadingMask />}
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
              {status === Status.loading ? (
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
              ) : (
                <div className="info-text">
                  <div className="info-wrap">
                    <div className="img">
                      {status === Status.failed ? (
                        <Image
                          src={'/images/steps/step-03-00.png'}
                          width={340}
                          height={326}
                          alt=""
                        />
                      ) : (
                        <Image
                          src={'/images/steps/step-03-01.png'}
                          width={392}
                          height={299}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="step-data">
              <div className="data-wrap">
                <ProcessStepPhoto
                  step={status === Status.success ? 3 : 2}
                  steps={PHOTO_STEP.steps}
                />

                <div className="title big">
                  <h1>
                    {status === Status.loading ? (
                      'Processing...'
                    ) : status === Status.failed ? (
                      <>
                        <span className="failed">{'Not approved'}</span>
                        {' - See Requirements Below and Retake Photo'}
                      </>
                    ) : (
                      <>
                        <span className="success">{'Success'}</span>
                        {' - Proceed To Checkout'}
                      </>
                    )}
                  </h1>
                </div>
              </div>

              <div className="photo-requirements">
                <div
                  className={classNames('requirements-wrap', { failed: status === Status.failed })}>
                  <div className="img">
                    <span>
                      <img src={imageLink} alt="" />
                    </span>
                    {status === Status.success && (
                      <button type="button" className="main-btn" onClick={goNext}>
                        {'Proceed To Checkout'}
                      </button>
                    )}
                    <button
                      type="button"
                      className="main-btn no-border"
                      onClick={() =>
                        router.push(
                          `${PAGES.photo.takePhoto}?entryId=${entry.id}&type=${type}&documentId=${document.id}`
                        )
                      }>
                      <i className="icon-camera" />
                      {'Change Photo'}
                    </button>
                  </div>
                  <div className="list">
                    <ul>
                      {status === Status.loading &&
                        CHECKLIST.map((text, index) => (
                          <li
                            key={`l_${index}`}
                            className={classNames({ loading: status === Status.loading })}>
                            <span className="icon" />
                            <span className="text">{text}</span>
                          </li>
                        ))}
                      {status === Status.failed &&
                        failed.map((f, index) => (
                          <li key={`f_${index}`}>
                            <span className="icon" />
                            <span className="text">{f.message}</span>
                          </li>
                        ))}
                      {status === Status.success &&
                        passed.map((p, index) => (
                          <li key={`p_${index}`}>
                            <span className="icon" />
                            <span className="text">{camelCaseToSentence(p.test ?? '')}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="data-wrap">
                {status !== Status.success && (
                  <div className="btn-wrap single">
                    <div className="action-btn">
                      <button
                        type="button"
                        className="main-btn"
                        onClick={() =>
                          router.push(
                            `${PAGES.photo.takePhoto}?entryId=${entry.id}&documentId=${document.id}`
                          )
                        }>
                        {status === Status.loading ? (
                          <Bars height={25} fill={'#FFFFFF'} stroke={'transparent'} />
                        ) : (
                          <span>{'Try again'}</span>
                        )}
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
                )}
                {status === Status.success && (
                  <div className="btn-wrap">
                    <div className="action-btn">
                      <button
                        type="button"
                        className="main-btn outline"
                        onClick={() =>
                          router.push(
                            `${PAGES.photo.takePhoto}?entryId=${entry.id}&documentId=${document.id}`
                          )
                        }>
                        <i className="icon-left" />
                        <span>{'Retake My Shot'}</span>
                      </button>
                      <button type="button" className="main-btn" onClick={goNext}>
                        {loading ? (
                          <Bars height={25} fill={'#FFFFFF'} stroke={'transparent'} />
                        ) : (
                          <>
                            {'Checkout'} <span className="icon-right" />
                          </>
                        )}
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames('modal-wrap', { open })}>
        <div className="overlay" />
        <div className="modal-content">
          <div className="content-scroll">
            <div className="up-sale">
              <div className="text">
                <div className="title">
                  <h3>
                    {'Save time, complete'}
                    <br /> {'your passport application'}
                    <br /> {'form online now'}
                    <br /> {'(avg. time: 2.5 mins)'}
                  </h3>
                </div>
                <div className="btn-wrap">
                  <button type="button" className="main-btn big" onClick={goApplication}>
                    {'Start Your DS-82/DS-11 Form'}
                  </button>
                  <button type="button" className="main-btn big outline" onClick={goCart}>
                    {'Skip & Proceed To Checkout'}
                  </button>
                </div>
              </div>
              <div className="img">
                <span>
                  <Link href={PAGES.application.create}>
                    <Image src="/images/upsell1.png" width={514} height={372} alt="" />
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProcessPhoto;
