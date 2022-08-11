import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  ReactNode,
  useState,
} from 'react'
import { useRouter } from 'next/router'

import { Country, PDocument } from '@/apollo'
import { useLocation, useCurrency } from '@/hooks'
import { Maybe } from '@/types'
import { ICountry } from '@/components/elements/countrySelector'

interface IContextProps {
  country: ICountry | undefined
  setOpenDocument: (open?: boolean) => void
}

export const OneClickContext = createContext<IContextProps>({
  openDocument: false,
  setOpenDocument: () => null,
})

export const OneClickProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [openDocument, setOpenDocument] = useState<boolean>(false)
  const { country: currentCountry, onChangeCountry } = useLocation()
  const { onChangeCurrencyByCountry } = useCurrency()
  const [country, setCountry] = useState<ICountry | undefined>()

  const [document, setDocument] = useState<Maybe<PDocument>>()

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

  const goTakePhoto = useCallback(
    async (d: Maybe<PDocument>) => {
      if (!d) {
        return
      }
      setDocument(d)
      // do something
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
    <OneClickContext.Provider
      value={{
        openDocument,
        setOpenDocument: (o?: boolean) => setOpenDocument(Boolean(o)),
      }}>
      {children}
    </OneClickContext.Provider>
  )
}

export const useOneClick = () => useContext(OneClickContext)
