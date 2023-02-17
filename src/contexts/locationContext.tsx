import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  createContext,
} from 'react'
import { useCookies } from 'react-cookie'

import { ICountry } from '@/components/elements/countrySelector'
import { useAuth } from '@/hooks'
import { countries, LANGUAGE_COOKIE_NAME } from '@/constants'
import { useRouter } from 'next/router'

interface ILocationContext {
  country: ICountry | undefined
  currentLanguage: ILanguage | undefined
  languages: ILanguage[]
  defaultLanguage: ILanguage['value']
  onChangeCountry: (c: ICountry) => void
  onChangeLanguage: (l?: string) => void
}
export interface ILanguage {
  id: string
  label: string
  value: string
}

export const LocationContext = createContext<ILocationContext>({
  country: undefined,
  currentLanguage: undefined,
  languages: [],
  defaultLanguage: 'en-us',
  onChangeCountry: () => null,
  onChangeLanguage: () => null,
})

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { me: user } = useAuth()

  const [country, setCountry] = useState<ICountry | undefined>()
  const [cookies, setCookie] = useCookies([LANGUAGE_COOKIE_NAME])

  useEffect(() => {
    if (!user || country) return
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
  }, [country, user])

  const languages: ILanguage[] = useMemo(
    () => [
      {
        id: 'en-us',
        label: 'English (US)',
        value: 'en-us',
      },
      {
        id: 'en-gb',
        label: 'English (UK)',
        value: 'en-gb',
      },
      {
        id: 'de-de',
        label: 'German',
        value: 'de-de',
      },
      {
        id: 'es-es',
        label: 'Spanish',
        value: 'es-es',
      },
      {
        id: 'fr-fr',
        label: 'French',
        value: 'fr-fr',
      },
      {
        id: 'it-it',
        label: 'Italian',
        value: 'it-it',
      },
    ],
    [],
  )
  const router = useRouter()

  const currentLanguage: ILanguage | undefined = useMemo(() => {
    const _cookieLang = cookies[LANGUAGE_COOKIE_NAME] || 'en'
    const _language: ILanguage | undefined = languages.find(
      (c) => c.value === _cookieLang,
    )

    return _language || languages[0]
  }, [cookies, languages])

  const onChangeLanguage = useCallback(
    (lang?: string) => {
      if (lang) {
        router.push('/', '', { locale: lang })
        setCookie(LANGUAGE_COOKIE_NAME, lang, {
          path: `/`,
        })
      }
    },
    [router, setCookie],
  )

  const onChangeCountry = useCallback(
    (_country: ICountry) => {
      if (country?.value !== _country.value) {
        setCountry(_country)
      }
    },
    [country?.value],
  )

  return (
    <LocationContext.Provider
      value={{
        country,
        currentLanguage,
        languages,
        defaultLanguage: languages[0]?.value || 'en-us',
        onChangeCountry,
        onChangeLanguage,
      }}>
      {children}
    </LocationContext.Provider>
  )
}
