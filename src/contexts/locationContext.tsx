import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  createContext,
} from 'react'
import { useCookies } from 'react-cookie'

import { iCountry } from '@/components/elements/countrySelector'
import { useAuth } from '@/hooks'
import { countries, LANGUAGE_COOKIE_NAME } from '@/constants'

interface ILocationContext {
  country: iCountry | undefined
  currentLanguage: ILanguage | undefined
  languages: ILanguage[]
  onChangeCountry: (c: iCountry) => void
  onChangeLanguage: (l?: string) => void
}
export interface ILanguage {
  label: string
  value: string
}

export const LocationContext = createContext<ILocationContext>({
  country: undefined,
  currentLanguage: undefined,
  languages: [],
  onChangeCountry: () => null,
  onChangeLanguage: () => null,
})

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { me: user } = useAuth()

  const [country, setCountry] = useState<iCountry | undefined>()
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
        label: 'English',
        value: 'en',
      },
    ],
    [],
  )

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

  return (
    <LocationContext.Provider
      value={{
        country,
        currentLanguage,
        languages,
        onChangeCountry,
        onChangeLanguage,
      }}>
      {children}
    </LocationContext.Provider>
  )
}
