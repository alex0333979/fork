import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PAGES, UK_PASSPORT_IMAGES, US_PASSPORT_IMAGES } from '../../constants';
import { useMediaQuery } from '@material-ui/core';
import classNames from 'classnames';
import { Country, useDocumentsByCountryQuery } from '@/generated/graphql';
import dynamic from 'next/dynamic';
import { CountryFlag, iCountry } from '@/components/elements/countrySelector';
import { Bars } from 'react-loading-icons';
const CountrySelector = dynamic(() => import('@/components/elements/countrySelector'), {
  ssr: false
});

interface MainIntroProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  country: Country | null;
  document: Country | null;
}

const MainIntro = (
  { open, setOpen, country: pCountry, document: pDoc }: MainIntroProps,
  ref: any
) => {
  const [country, setCountry] = useState<iCountry>({
    label: pCountry?.country ?? 'United States',
    value: pCountry?.countryCode ?? 'US'
  });
  const [documents, setDocuments] = useState<Country[]>([]);
  const router = useRouter();
  const matches = useMediaQuery('only screen and (min-width: 641px)');
  const { data, loading } = useDocumentsByCountryQuery({
    variables: { country: country.label },
    fetchPolicy: 'no-cache'
  });
  const [document, setDocument] = useState<Country | undefined>(pDoc ?? undefined);

  useEffect(() => {
    if (data?.DocumentsByCountry.data) {
      setDocuments(data.DocumentsByCountry.data);
    }
  }, [data?.DocumentsByCountry.data]);

  const goTakePhoto = useCallback(
    async (d: Country | undefined) => {
      if (!d) {
        return;
      }
      setDocument(d);
      await router.push(`${PAGES.photo.takePhoto}?documentId=${d.id}`);
    },
    [router]
  );

  const onSelectedCountry = useCallback((country: iCountry) => {
    setCountry(country);
    setDocument(undefined);
  }, []);

  return (
    <>
      <div className="main-intro" ref={ref}>
        <div className="container">
          <div className="intro-wrap mobile-img">
            <div className="intro-title">
              <div className="title big">
                <h1>
                  {pCountry && pDoc ? (
                    <b>{`Take Your ${pCountry.country} ${pDoc.type} Photo Online`}</b>
                  ) : (
                    <b>{'Passport and Visa Photos Online'}</b>
                  )}
                </h1>
                <p>{'Get your perfect biometric photo (compliance guaranteed)'}</p>
              </div>
              <div className="select-country">
                {!document && (
                  <div className="form-fields">
                    <label>
                      <span className="label">{'What country is this for?'}</span>
                      <span className="field">
                        <CountrySelector country={country} onSelectCountry={onSelectedCountry} />
                      </span>
                    </label>
                  </div>
                )}
                <div className="submit-btn">
                  {document ? (
                    <>
                      <a className="main-btn big" onClick={() => goTakePhoto(document)}>
                        {`Start Your ${document.type} Photo now`}
                      </a>
                      <div className="choose-text">
                        <a onClick={() => setOpen(true)}>{'Change Country Or Document Type'}</a>
                      </div>
                    </>
                  ) : (
                    <a className="main-btn big" onClick={() => setOpen(true)}>
                      {'Choose document'}
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="intro-img">
              <div className="country-flag">
                <CountryFlag size={'30px'} code={country.value.toLocaleLowerCase()} />
                {/* <Image src={'/images/emoji/british-flag.png'} width={40} height={40} alt="" />*/}
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
          {loading && (
            <div className="loading-wrapper">
              <Bars height={50} fill={'#0080FF'} stroke={'transparent'} />
            </div>
          )}
          <div className="close-btn">
            <button type="button" onClick={() => setOpen(false)}>
              <span className="icon-close" />
            </button>
          </div>
          <div className="content-scroll">
            <div className="select-document">
              <div className="form-fields">
                <label>
                  <CountrySelector country={country} onSelectCountry={onSelectedCountry} />
                </label>
              </div>
              <div className="document-options">
                {documents.map((d, i) => (
                  <label key={i}>
                    <input
                      type="radio"
                      name={`document-${i}`}
                      checked={document?.id === d.id}
                      onChange={() => goTakePhoto(d)}
                    />
                    <span className="wrap-box">
                      <span className="bullet">
                        <span className="img">
                          {d.country === 'United States' &&
                          US_PASSPORT_IMAGES.find((i) => i.name === d.type) ? (
                            <Image
                              src={`/images/passports/${
                                US_PASSPORT_IMAGES.find((i) => i.name === d.type)?.image
                              }`}
                              layout={'fill'}
                              alt=""
                            />
                          ) : d.country === 'United Kingdom' &&
                            UK_PASSPORT_IMAGES.find((i) => i.name === d.type) ? (
                            <Image
                              src={`/images/passports/${
                                UK_PASSPORT_IMAGES.find((i) => i.name === d.type)?.image
                              }`}
                              layout={'fill'}
                              alt=""
                            />
                          ) : d.type === 'Passport' ? (
                            <Image
                              src={`/images/passports/${
                                d.countryCode?.toLowerCase() ?? 'passport'
                              }.png`}
                              layout={'fill'}
                              alt=""
                            />
                          ) : (
                            <Image src="/images/passports/default-img.png" layout={'fill'} alt="" />
                          )}
                        </span>
                      </span>
                      <span className="name">{d.type}</span>
                    </span>
                  </label>
                ))}
              </div>
              <div className="submit-btn">
                <a className="main-btn big outline" onClick={() => goTakePhoto(document)}>
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
