import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PAGES } from '../../constants';
import { useMediaQuery } from '@material-ui/core';
import { HomePageProps } from '@/pages/index';
import classNames from 'classnames';
import { Country, useDocumentsByCountryQuery } from '@/generated/graphql';

const MainIntro = ({ countries }: HomePageProps, ref: any) => {
  const [country, setCountry] = useState<string>('United States');
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const matches = useMediaQuery('only screen and (min-width: 641px)');
  const { data: documents } = useDocumentsByCountryQuery({
    variables: { country },
    fetchPolicy: 'no-cache'
  });
  const [document, setDocument] = useState<Country | undefined>(undefined);

  const goTakePhoto = useCallback(async () => {
    if (!document) {
      return;
    }
    await router.push(`${PAGES.photo.selectType}?documentId=${document.id}`);
  }, [document, router]);

  return (
    <>
      <div className="main-intro" ref={ref}>
        <div className="container">
          <div className="intro-wrap mobile-img">
            <div className="intro-title">
              <div className="title big">
                <h1>
                  <b>{'Passport and Visa Photos Online'}</b>
                </h1>
                <p>{'Get your perfect biometric photo (compliance guaranteed)'}</p>
              </div>
              <div className="select-country">
                <div className="form-fields">
                  <label>
                    <span className="label">{'What country is this for?'}</span>
                    <span className="field select">
                      <select
                        name="select"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}>
                        <option value="default" disabled hidden>
                          {'Select country'}
                        </option>
                        {countries.map((c, i) => (
                          <option value={c.country} key={i}>
                            {c.country}
                          </option>
                        ))}
                      </select>
                    </span>
                  </label>
                </div>
                <div className="submit-btn">
                  <a className="main-btn big" onClick={() => setOpen(true)}>
                    {'Choose document'}
                  </a>
                </div>
              </div>
            </div>
            <div className="intro-img">
              <div className="country-flag">
                <Image src={'/images/emoji/british-flag.png'} width={40} height={40} alt="" />
              </div>
              <span>
                <picture>
                  {matches ? (
                    <Image src={'/images/intro-01.png'} width={737} height={747} alt={''} />
                  ) : (
                    <Image src={'/images/intro-01-3-m.png'} width={271} height={254} alt="" />
                  )}
                </picture>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames('modal-wrap doc-type', { open })}>
        <div className="overlay" />
        <div className="modal-content">
          <div className="close-btn">
            <button type="button" onClick={() => setOpen(false)}>
              <span className="icon-close" />
            </button>
          </div>
          <div className="content-scroll">
            <div className="select-document">
              <div className="form-fields">
                <label>
                  <select
                    name="select-1"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}>
                    <option value="default" disabled hidden>
                      {'Select country'}
                    </option>
                    {countries.map((c, i) => (
                      <option value={c.country} key={i}>
                        {c.country}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="document-options">
                {documents?.DocumentsByCountry.data &&
                  documents?.DocumentsByCountry.data.map((d, i) => (
                    <label key={i}>
                      <input
                        type="radio"
                        name={`document-${i}`}
                        checked={document?.id === d.id}
                        onChange={() => setDocument(d)}
                      />
                      <span className="wrap-box">
                        <span className="bullet">
                          <span className="img">
                            <Image src="/images/passport.png" layout={'fill'} alt="" />
                          </span>
                        </span>
                        <span className="name">{d.type}</span>
                      </span>
                    </label>
                  ))}
              </div>
              <div className="submit-btn">
                <a className="main-btn big outline" onClick={() => goTakePhoto()}>
                  <i className="icon-camera" />
                  {'Take A Photo'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.forwardRef(MainIntro);
