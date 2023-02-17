import { ComponentType, FunctionComponent, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useLocation } from '@/hooks'
import i18n from '@/i18n'

export function withLocale<Props extends { locale?: string }>(
  WrappedComponent: ComponentType<Props>,
): ComponentType<Props> {
  const withLocaleComponent: FunctionComponent<Props> = (props: Props) => {
    const { locale } = props
    const { languages, defaultLanguage, onChangeLanguage } = useLocation()
    const router = useRouter()

    const isValidLocale = useCallback(
      (_locale: string | undefined) =>
        languages.find((l) => l.value === _locale),
      [languages],
    )

    useEffect(() => {
      if (router.isReady && isValidLocale(locale)) {
        onChangeLanguage(locale)
      }
    }, [isValidLocale, locale, onChangeLanguage, router.isReady])

    if (locale && !languages.find((l) => l.value === locale)) {
      router.push('/404')
    }

    let defaultLocale = i18n.language.toLowerCase()
    if (!isValidLocale(defaultLocale)) {
      defaultLocale = defaultLanguage
    }

    return (
      <WrappedComponent {...{ ...props, locale: locale || defaultLocale }} />
    )
  }

  return withLocaleComponent
}
