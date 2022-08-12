import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  ReactNode,
  useState,
} from 'react'
import { useRouter } from 'next/router'

import { PDocument } from '@/apollo'
import { useLocation, useCurrency } from '@/hooks'
import { Maybe } from '@/types'
import { ICountry } from '@/components/elements/countrySelector'
import { PAGES } from '@/constants'
import { TModalType } from './types'

interface IContextProps {
  modalType: TModalType
  country: ICountry | undefined
  document: Maybe<PDocument>
  onCloseDocModal: () => void
  onSelectCountry: (c: ICountry) => void
  onSelectDocument: (d: Maybe<PDocument>) => void
}

export const OneClickContext = createContext<IContextProps>({
  modalType: 'select-doc',
  country: undefined,
  document: null,
  onCloseDocModal: () => null,
  onSelectCountry: () => null,
  onSelectDocument: () => null,
})

export const OneClickProvider = ({
  children,
}: {
  children: (v: IContextProps) => ReactNode
}) => {
  const router = useRouter()
  const [modalType, setModalType] = useState<TModalType>('select-doc')
  const { country: currentCountry, onChangeCountry } = useLocation()
  const { onChangeCurrencyByCountry } = useCurrency()
  const [country, setCountry] = useState<ICountry | undefined>()
  const [document, setDocument] = useState<Maybe<PDocument>>()

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

  const onSelectDocument = useCallback(async (d: Maybe<PDocument>) => {
    if (d) {
      setDocument(d)
      setModalType('take-photo')
    }
  }, [])

  const onSelectCountry = useCallback(
    (country: ICountry) => {
      onCountryChanged(country)
      setDocument(undefined)
    },
    [onCountryChanged],
  )

  return (
    <OneClickContext.Provider
      value={{
        modalType,
        country,
        document,
        onCloseDocModal: () => router.push(PAGES.home),
        onSelectCountry,
        onSelectDocument,
      }}>
      {children({
        modalType,
        country,
        document,
        onCloseDocModal: () => router.push(PAGES.home),
        onSelectCountry,
        onSelectDocument,
      })}
    </OneClickContext.Provider>
  )
}

export const useOneClick = () => useContext(OneClickContext)
