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

import {
  Entry,
  Form,
  PDocument,
  useFormsQuery,
  useEntryLazyQuery,
} from '@/apollo'
import { useLocation, useCurrency } from '@/hooks'
import { Maybe, TCamera } from '@/types'
import { ICountry } from '@/components/elements/countrySelector'
import { PAGES, PHOTO_FORM } from '@/constants'
import { TModalType } from './types'
import { showError } from '@/utils'

interface IContextProps {
  modalType: TModalType
  country: ICountry | undefined
  document: Maybe<PDocument>
  form: Maybe<Form>
  entry: Maybe<Entry>
  camera: TCamera
  modalClass: string
  onCloseModal: () => void
  onSelectCountry: (c: ICountry) => void
  onSelectDocument: (d: Maybe<PDocument>) => void
  onEntrySubmitted: (eId: string, camera: TCamera) => void
  onChangePhoto: () => void
  onCheckCart: () => void
  onSetDeliveryMethod: () => void
  onAddAnother: () => void
}

export const OneClickContext = createContext<IContextProps>({
  modalType: 'select-doc',
  country: undefined,
  document: null,
  form: null,
  entry: null,
  camera: 'user',
  modalClass: '',
  onCloseModal: () => null,
  onSelectCountry: () => null,
  onSelectDocument: () => null,
  onEntrySubmitted: () => null,
  onChangePhoto: () => null,
  onCheckCart: () => null,
  onSetDeliveryMethod: () => null,
  onAddAnother: () => null,
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
  const [entry, setEntry] = useState<Maybe<Entry>>(undefined)
  const [camera, setCamera] = useState<TCamera>('user')

  const { data: formsRes } = useFormsQuery({
    fetchPolicy: 'cache-first',
  })

  const [fetchEntry] = useEntryLazyQuery({
    onCompleted: (res) => {
      setEntry(res.Entry.data)
    },
    onError: () => {
      showError('Something went wrong while fetching entry')
    },
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

  const onEntrySubmitted = useCallback(
    (_entryId: string, _camera: TCamera) => {
      setCamera(_camera)
      fetchEntry({
        variables: {
          entryId: _entryId,
        },
      })
      setModalType('process-photo')
    },
    [fetchEntry],
  )

  const onChangeModal = useCallback((type: TModalType) => {
    setModalType(type)
  }, [])

  const onCloseModal = useCallback(() => {
    if (modalType === 'select-doc') {
      router.push(PAGES.home)
    } else {
      setModalType('select-doc')
      setEntry(undefined)
      setCamera('user')
    }
  }, [modalType, router])

  const form = useMemo(
    () => (formsRes?.Forms || []).find((f) => f.name === PHOTO_FORM),
    [formsRes?.Forms],
  )

  const modalClass = useMemo(() => {
    if (modalType === 'take-photo') return 'one-click-take-photo'
    else if (modalType === 'process-photo') return 'one-click-process-photo'

    return ''
  }, [modalType])

  const values: IContextProps = useMemo(
    () => ({
      modalType,
      country,
      document,
      form,
      entry,
      camera,
      modalClass,
      onCloseModal,
      onSelectCountry,
      onSelectDocument,
      onEntrySubmitted,
      onChangePhoto: () => onChangeModal('take-photo'),
      onCheckCart: () => onChangeModal('check-cart'),
      onSetDeliveryMethod: () => onChangeModal('delivery-method'),
      onAddAnother: () => onChangeModal('select-doc'),
    }),
    [
      modalType,
      country,
      document,
      form,
      entry,
      camera,
      modalClass,
      onCloseModal,
      onSelectCountry,
      onSelectDocument,
      onEntrySubmitted,
      onChangeModal,
    ],
  )

  return (
    <OneClickContext.Provider value={values}>
      {children(values)}
    </OneClickContext.Provider>
  )
}

export const useOneClick = () => useContext(OneClickContext)
