import { useCallback, useMemo } from 'react'
import { useCookies } from 'react-cookie'

import { LANGUAGE_COOKIE_NAME } from '@/lib/apolloClient'

export interface ILanguage {
  label: string
  value: string
}

export const useLanguage = () => {
  const [cookies, setCookie] = useCookies([LANGUAGE_COOKIE_NAME])

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

  return {
    currentLanguage,
    languages,
    onChangeLanguage,
  }
}
