import { useCallback, useEffect, useState } from 'react'

import { useAuth } from '@/lib/auth'
import {
  Currency,
  CurrencyCode,
  CurrencyType,
  useCurrenciesLazyQuery,
  useSetDefaultCurrencyMutation,
} from '@/generated/graphql'

export const useCurrency = () => {
  const { cart, updateCart } = useAuth()

  const [currencies, setCurrencies] = useState<Currency[] | undefined>()
  const [currentCurrency, setCurrentCurrency] = useState<Currency | undefined>()
  const [initial, setInitial] = useState<boolean>(true)

  const [fetchCurrencies, { loading }] = useCurrenciesLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      setCurrencies(res?.Currencies?.data || [])
    },
  })

  const [setDefaultCurrency] = useSetDefaultCurrencyMutation({
    fetchPolicy: 'network-only',
    onCompleted: (res) => {
      updateCart(res.SetDefaultCurrency.data || cart)
    },
  })

  useEffect(() => {
    if (currencies) return
    fetchCurrencies()
  }, [currencies, fetchCurrencies])

  useEffect(() => {
    if (initial && !currentCurrency && cart?.defaultCurrency) {
      setCurrentCurrency(cart.defaultCurrency)
      setInitial(false)
    }
  }, [initial, cart?.defaultCurrency, currentCurrency])

  const onChangeCurrency = useCallback(
    (currency: Currency | undefined) => {
      if (!currency || !currentCurrency) return
      if (currency.code === currentCurrency.code) return

      setCurrentCurrency(currency)
      setDefaultCurrency({
        variables: {
          currency,
        },
      })
    },
    [currentCurrency, setDefaultCurrency],
  )

  return {
    currencies: currencies || [],
    loading,
    currentCurrency: currentCurrency || {
      code: CurrencyCode.Us,
      label: CurrencyType.Usd,
      symbol: '$',
    },
    onChangeCurrency,
  }
}
