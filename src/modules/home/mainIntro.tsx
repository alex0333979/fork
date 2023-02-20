/* eslint-disable max-len */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { PrismicDocument } from '@prismicio/types'
import { PrismicRichText } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers'

import { Country, PDocument } from '@/apollo'
import { useLocation, useCurrency } from '@/hooks'
import { Maybe } from '@/types'
import { ICountry } from '@/components/elements/countrySelector'
import { PAGES } from '@/constants'
import DocModal from './docModal'
import { transformPrismic } from '@/utils/prismic'
import { imageLoader } from '../about/summary'
const CountrySelector = dynamic(
  () => import('@/components/elements/countrySelector'),
  {
    ssr: false,
  },
)

interface MainIntroProps {
  open: boolean
  onStartNow: (isOpen?: boolean) => void
  country: Country | null
  document: PDocument | null
  title?: string
  buttonTitle?: string
  description?: any
  page?: PrismicDocument<Record<string, any>, string, string>
}

const MainIntro = (
  { page, open, onStartNow, country: pCountry, document: pDoc }: MainIntroProps,
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
  const timer = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  const [document, setDocument] = useState<Maybe<PDocument>>(pDoc)

  const onCountryChanged = useCallback(
    (c: ICountry) => {
      if (country?.value === c.value) return
      setCountry(c)
      onChangeCountry(c)
      onChangeCurrencyByCountry(c.value)
    },
    [country, onChangeCountry, onChangeCurrencyByCountry],
  )

  useEffect(() => {
    if (country === undefined) {
      if (pCountry?.country && pCountry?.countryCode) {
        setCountry({
          label: pCountry.country,
          value: pCountry.countryCode,
        })
      } else if (currentCountry) {
        setCountry(currentCountry)
      }
    }
  }, [country, currentCountry, pCountry?.country, pCountry?.countryCode])

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    if (country) {
      timer.current = setTimeout(() => {
        onChangeCountry(country)
        onChangeCurrencyByCountry(country.value)
      }, 300)
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, onChangeCountry])

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

  const onSelectCountry = useCallback(
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
              <div className="title big prismic-content">
                <h1>
                  <b>
                    {transformPrismic(prismicH.asText(page?.data.title), {
                      country: country?.label,
                      documentType: document?.type,
                    })}
                  </b>
                </h1>
                <PrismicRichText field={page?.data.text} />
              </div>
              <div className="select-country">
                {!pDoc && (
                  <div className="form-fields">
                    <label>
                      <span className="label prismic-content">
                        <PrismicRichText field={page?.data.country_label} />
                      </span>
                      <span className="field">
                        <CountrySelector
                          country={country}
                          onSelectCountry={onSelectCountry}
                        />
                      </span>
                    </label>
                  </div>
                )}
                <div className="submit-btn">
                  {pCountry && pDoc ? (
                    <>
                      <a
                        className="main-btn big prismic-content"
                        onClick={() => goTakePhoto(document)}>
                        <PrismicRichText field={page?.data.button_label} />
                      </a>
                      <div className="choose-text">
                        <a onClick={() => onStartNow(true)}>
                          Change Country Or Document
                        </a>
                      </div>
                    </>
                  ) : pCountry ? (
                    <a
                      className="main-btn big"
                      onClick={() => onStartNow(true)}>
                      Choose Document and Start Now
                    </a>
                  ) : (
                    <a
                      className="main-btn big prismic-content"
                      onClick={() => onStartNow(true)}>
                      <PrismicRichText field={page?.data.button_label} />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="intro-img">
              <span>
                <picture>
                  <Image
                    src={page?.data.intro_image.url}
                    width={page?.data.intro_image.dimensions.width}
                    height={page?.data.intro_image.dimensions.height}
                    loader={imageLoader}
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
        onClose={() => onStartNow(false)}
        country={country}
        onSelectCountry={onSelectCountry}
        document={document}
        onSelectDocument={goTakePhoto}
      />
    </>
  )
}

export default React.forwardRef(MainIntro)
