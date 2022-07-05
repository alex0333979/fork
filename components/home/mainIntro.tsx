/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { Bars } from 'react-loading-icons'
import {
  Country,
  PDocument,
  useDocumentsByCountryLazyQuery,
} from '@/generated/graphql'
import { useLocation, useCurrency } from '@/hooks/index'
import { iCountry } from '@/components/elements/countrySelector'
import {
  PAGES,
  UK_PASSPORT_IMAGES,
  US_PASSPORT_IMAGES,
} from '@/constants/index'
const CountrySelector = dynamic(
  () => import('@/components/elements/countrySelector'),
  {
    ssr: false,
  },
)

interface MainIntroProps {
  open: boolean
  setOpen: React.Dispatch<boolean>
  country: Country | null
  document: PDocument | null
  title?: string
  description?: any
}

const MainIntro = (
  {
    open,
    setOpen,
    country: pCountry,
    document: pDoc,
    title,
    description,
  }: MainIntroProps,
  ref: any,
) => {
  const { country: currentCountry, onChangeCountry } = useLocation()
  const { onChangeCurrencyByCountry } = useCurrency()
  const [country, setCountry] = useState<iCountry | undefined>(
    pCountry
      ? {
          label: pCountry.country || '',
          value: pCountry.countryCode || '',
        }
      : undefined,
  )
  const [documents, setDocuments] = useState<PDocument[]>([])
  const router = useRouter()
  const [fetchDocuments, { loading }] = useDocumentsByCountryLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res?.DocumentsByCountry.data) {
        setDocuments(res.DocumentsByCountry.data)
      }
    },
  })

  const [document, setDocument] = useState<Country | undefined>(
    pDoc ?? undefined,
  )

  const onCountryChanged = useCallback(
    (c: iCountry) => {
      if (country?.value === c.value) return
      setCountry(c)
      onChangeCountry(c)
      onChangeCurrencyByCountry(c.value)
    },
    [country, onChangeCountry, onChangeCurrencyByCountry],
  )

  useEffect(() => {
    if (country === undefined && currentCountry) {
      setCountry(
        currentCountry
          ? currentCountry
          : {
              label: 'United States',
              value: 'US',
            },
      )
    }
  }, [country, currentCountry])

  useEffect(() => {
    if (country?.label) {
      fetchDocuments({
        variables: { country: country.label },
      })
    }
  }, [country?.label, fetchDocuments])

  useEffect(() => {
    if (pCountry?.country && pCountry.countryCode) {
      onCountryChanged({
        label: pCountry.country,
        value: pCountry.countryCode,
      })
    }
  }, [onCountryChanged, pCountry?.country, pCountry?.countryCode])

  const goTakePhoto = useCallback(
    async (d: Country | undefined) => {
      if (!d) {
        return
      }
      setDocument(d)
      await router.push(`${PAGES.photo.takePhoto}?documentId=${d.id}`)
    },
    [router],
  )

  const onSelectedCountry = useCallback(
    (country: iCountry) => {
      onCountryChanged(country)
      setDocument(undefined)
    },
    [onCountryChanged],
  )

  const countryName = useMemo(() => {
    if (!pCountry) return ''
    if (pCountry.countryCode?.toLowerCase() === 'us') return 'US'
    if (pCountry.countryCode?.toLowerCase() === 'gb') return 'UK'

    return pCountry.country || ''
  }, [pCountry])

  return (
    <>
      <div className="main-intro" ref={ref}>
        <div className="container">
          <div className="intro-wrap mobile-img">
            <div className="intro-title">
              <div className="title big">
                <h1>
                  <b>{title}</b>
                </h1>
                <p>{description}</p>
              </div>
              <div className="select-country">
                {!pDoc && (
                  <div className="form-fields">
                    <label>
                      <span className="label">
                        {'What country is this for?'}
                      </span>
                      <span className="field">
                        <CountrySelector
                          country={country}
                          onSelectCountry={onSelectedCountry}
                        />
                      </span>
                    </label>
                  </div>
                )}
                <div className="submit-btn">
                  {pCountry && pDoc ? (
                    <>
                      <a
                        className="main-btn big"
                        onClick={() => goTakePhoto(document)}>
                        {`Take Your ${countryName} ${pDoc.type} Photo Now`}
                      </a>
                      <div className="choose-text">
                        <a onClick={() => setOpen(true)}>
                          {'Change Country Or Document'}
                        </a>
                      </div>
                    </>
                  ) : pCountry ? (
                    <a className="main-btn big" onClick={() => setOpen(true)}>
                      {`Choose Document and Start Now`}
                    </a>
                  ) : (
                    <a className="main-btn big" onClick={() => setOpen(true)}>
                      {'Choose document'}
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="intro-img">
              <span>
                <picture>
                  <Image
                    src={'/images/intro.png'}
                    width={650}
                    height={637}
                    alt={''}
                  />
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
                  <CountrySelector
                    country={country}
                    onSelectCountry={onSelectedCountry}
                  />
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
                                US_PASSPORT_IMAGES.find(
                                  (i) => i.name === d.type,
                                )?.image
                              }`}
                              layout={'fill'}
                              alt=""
                            />
                          ) : d.country === 'United Kingdom' &&
                            UK_PASSPORT_IMAGES.find(
                              (i) => i.name === d.type,
                            ) ? (
                            <Image
                              src={`/images/passports/${
                                UK_PASSPORT_IMAGES.find(
                                  (i) => i.name === d.type,
                                )?.image
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
                            <Image
                              src="/images/passports/default-img.png"
                              layout={'fill'}
                              alt=""
                            />
                          )}
                        </span>
                      </span>
                      <span className="name">{d.type}</span>
                    </span>
                  </label>
                ))}
              </div>
              <div className="submit-btn">
                <a
                  className="main-btn big outline"
                  onClick={() => goTakePhoto(document)}>
                  <i className="icon-camera" />
                  {'Take A Photo'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.forwardRef(MainIntro)
