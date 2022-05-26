/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { PAGES, UK_PASSPORT_IMAGES, US_PASSPORT_IMAGES } from '../../constants'
import classNames from 'classnames'
import {
  Country,
  PDocument,
  useDocumentsByCountryQuery,
} from '@/generated/graphql'
import dynamic from 'next/dynamic'
import { iCountry } from '@/components/elements/countrySelector'
import { Bars } from 'react-loading-icons'
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
  description?: string
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
  const [country, setCountry] = useState<iCountry>({
    label: pCountry?.country ?? 'United States',
    value: pCountry?.countryCode ?? 'US',
  })
  const [documents, setDocuments] = useState<PDocument[]>([])
  const router = useRouter()
  const { data, loading } = useDocumentsByCountryQuery({
    variables: { country: country.label },
    fetchPolicy: 'no-cache',
  })
  const [document, setDocument] = useState<Country | undefined>(
    pDoc ?? undefined,
  )

  useEffect(() => {
    if (data?.DocumentsByCountry.data) {
      setDocuments(data.DocumentsByCountry.data)
    }
  }, [data?.DocumentsByCountry.data])

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

  const onSelectedCountry = useCallback((country: iCountry) => {
    setCountry(country)
    setDocument(undefined)
  }, [])

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
