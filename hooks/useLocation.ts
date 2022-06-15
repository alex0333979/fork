import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'

import { Currency, CurrencyCode, CurrencyType } from '@/generated/graphql'

import { LANGUAGE_COOKIE_NAME } from '@/lib/apolloClient'
import { useAuth } from '@/lib/auth'
import { iCountry } from '@/components/elements/countrySelector'
import { countries } from '@/constants/index'
import { useCurrency } from './useCurrency'

export interface ILanguage {
  label: string
  value: string
}

export const useLocation = () => {
  const { getMe: user } = useAuth()
  const { onChangeCurrency } = useCurrency()

  const [country, setCountry] = useState<iCountry | undefined>()
  const [cookies, setCookie] = useCookies([LANGUAGE_COOKIE_NAME])

  useEffect(() => {
    if (user && !country) {
      let _country: any | undefined = countries.find(
        (ic) => ic.countryCode === user.country,
      )

      _country = _country
        ? {
            label: _country.country,
            value: _country.countryCode,
          }
        : undefined

      setCountry(_country)
    }
  }, [country, user])

  useEffect(() => {
    if (!country) return
    let currency: Currency = {
      label: CurrencyType.Usd,
      code: CurrencyCode.Us,
      symbol: '$',
    }

    if (country.value === 'GB') {
      currency = {
        label: CurrencyType.Gbp,
        code: CurrencyCode.Gb,
        symbol: '£',
      }
    } else if (['DE', 'FR', 'IT', 'ES'].includes(country.value)) {
      currency = {
        label: CurrencyType.Eur,
        code: CurrencyCode.Eu,
        symbol: '€',
      }
    }

    onChangeCurrency(currency)
  }, [country, onChangeCurrency])

  const languages: ILanguage[] = useMemo(
    () => [
      {
        label: 'English',
        value: 'en',
      },
    ],
    [],
  )

  const currentLanguage: ILanguage = useMemo(() => {
    const _cookieLang = cookies[LANGUAGE_COOKIE_NAME] || 'en'
    const _language: ILanguage | undefined = languages.find(
      (c) => c.value === _cookieLang,
    )

    return _language || languages[0]
  }, [cookies, languages])

  const onChangeLanguage = useCallback(
    (lang?: string) => {
      if (lang) {
        setCookie(LANGUAGE_COOKIE_NAME, lang, {
          path: '/',
        })
      }
    },
    [setCookie],
  )

  const onChangeCountry = useCallback((_country: iCountry) => {
    setCountry(_country)
  }, [])

  return {
    country,
    currentLanguage,
    languages,
    onChangeLanguage,
    onChangeCountry,
  }
}
