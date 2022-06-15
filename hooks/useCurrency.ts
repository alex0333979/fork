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

  const [fetchCurrencies, { loading }] = useCurrenciesLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      setCurrencies(res?.Currencies?.data || [])
    },
  })

  const [setDefaultCurrency] = useSetDefaultCurrencyMutation({
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      updateCart(res.SetDefaultCurrency.data || cart)
    },
  })

  useEffect(() => {
    if (currencies) return
    fetchCurrencies()
  }, [currencies, fetchCurrencies])

  const onChangeCurrency = useCallback(
    (currency: Currency | undefined) => {
      if (!currency) return

      setCurrentCurrency(currency)
      setDefaultCurrency({
        variables: {
          currency,
        },
      })
    },
    [setDefaultCurrency],
  )

  useEffect(() => {
    if (!cart || currentCurrency) return

    const defaultCurrency: Currency = cart.defaultCurrency || {
      code: CurrencyCode.Us,
      label: CurrencyType.Usd,
      symbol: '$',
    }

    onChangeCurrency(defaultCurrency)
  }, [cart, currentCurrency, onChangeCurrency])

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
