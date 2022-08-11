/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Country, PDocument } from '@/apollo'
import { useLocation, useCurrency } from '@/hooks'
import { Maybe } from '@/types'
import { ICountry } from '@/components/elements/countrySelector'
import { PAGES } from '@/constants'
import DocModal from './docModal'
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
  buttonTitle?: string
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
    buttonTitle,
  }: MainIntroProps,
  ref: any,
) => {
  const { country: currentCountry, onChangeCountry } = useLocation()
  const { onChangeCurrencyByCountry } = useCurrency()
  const [country, setCountry] = useState<ICountry | undefined>(
    pCountry
      ? {
          label: pCountry.country || '',
          value: pCountry.countryCode || '',
        }
      : undefined,
  )
  const router = useRouter()

  const [document, setDocument] = useState<Maybe<PDocument>>(pDoc)

  const onCountryChanged = useCallback(
    (c: ICountry) => {
      if (country?.value === c.value) return
      setCountry(c)
      console.log({ c })
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
    if (pCountry?.country && pCountry.countryCode) {
      onCountryChanged({
        label: pCountry.country,
        value: pCountry.countryCode,
      })
    }
  }, [onCountryChanged, pCountry?.country, pCountry?.countryCode])

  const goTakePhoto = useCallback(
    async (d: Maybe<PDocument>) => {
      if (!d) {
        return
      }
      setDocument(d)
      await router.push(`${PAGES.photo.takePhoto}?documentId=${d.id}`)
    },
    [router],
  )

  const onSelectedCountry = useCallback(
    (country: ICountry) => {
      onCountryChanged(country)
      setDocument(undefined)
    },
    [onCountryChanged],
  )

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
                      <span className="label">What country is this for?</span>
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
                        {buttonTitle}
                      </a>
                      <div className="choose-text">
                        <a onClick={() => setOpen(true)}>
                          Change Country Or Document
                        </a>
                      </div>
                    </>
                  ) : pCountry ? (
                    <a className="main-btn big" onClick={() => setOpen(true)}>
                      Choose Document and Start Now
                    </a>
                  ) : (
                    <a className="main-btn big" onClick={() => setOpen(true)}>
                      Choose document
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="intro-img">
              <span>
                <picture>
                  <Image
                    src="/images/intro.png"
                    width={650}
                    height={637}
                    alt=""
                  />
                </picture>
              </span>
            </div>
          </div>
        </div>
      </div>
      <DocModal
        open={open}
        onClose={() => setOpen(false)}
        country={country}
        onSelectedCountry={onSelectedCountry}
        document={document}
        onSelectDocument={goTakePhoto}
      />
    </>
  )
}

export default React.forwardRef(MainIntro)
