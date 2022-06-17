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
    if (initial && cart?.defaultCurrency) {
      setCurrentCurrency(cart.defaultCurrency)
      setInitial(false)
    }
  }, [initial, cart?.defaultCurrency])

  const onChangeCurrency = useCallback(
    (currency: Currency | undefined) => {
      if (!currency) return
      if (currency.code === currentCurrency?.code) return

      setCurrentCurrency(currency)
      setDefaultCurrency({
        variables: {
          currency,
        },
      })
    },
    [currentCurrency?.code, setDefaultCurrency],
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
