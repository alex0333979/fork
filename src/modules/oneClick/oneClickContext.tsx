import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  ReactNode,
  useState,
} from 'react'
import { useRouter } from 'next/router'

import { Form, PDocument, useFormsQuery } from '@/apollo'
import { useLocation, useCurrency } from '@/hooks'
import { Maybe } from '@/types'
import { ICountry } from '@/components/elements/countrySelector'
import { PAGES, PHOTO_FORM } from '@/constants'
import { TModalType } from './types'

interface IContextProps {
  modalType: TModalType
  country: ICountry | undefined
  document: Maybe<PDocument>
  form: Maybe<Form>
  onCloseModal: () => void
  onSelectCountry: (c: ICountry) => void
  onSelectDocument: (d: Maybe<PDocument>) => void
}

export const OneClickContext = createContext<IContextProps>({
  modalType: 'select-doc',
  country: undefined,
  document: null,
  form: null,
  onCloseModal: () => null,
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

  const { data: formsRes } = useFormsQuery({
    fetchPolicy: 'cache-first',
  })

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

  const onCloseModal = useCallback(() => {
    if (modalType === 'select-doc') {
      router.push(PAGES.home)
    } else {
      setModalType('select-doc')
    }
  }, [modalType, router])

  const form = useMemo(
    () => (formsRes?.Forms || []).find((f) => f.name === PHOTO_FORM),
    [formsRes?.Forms],
  )

  const values = useMemo(
    () => ({
      modalType,
      country,
      document,
      form,
      onCloseModal,
      onSelectCountry,
      onSelectDocument,
    }),
    [
      country,
      document,
      form,
      modalType,
      onCloseModal,
      onSelectCountry,
      onSelectDocument,
    ],
  )

  return (
    <OneClickContext.Provider value={values}>
      {children(values)}
    </OneClickContext.Provider>
  )
}

export const useOneClick = () => useContext(OneClickContext)
