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
  const [currentCurrency, setCurrentCurrency] = useState<Currency>({
    code: CurrencyCode.Us,
    label: CurrencyType.Usd,
    symbol: '$',
  })

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

  useEffect(() => {
    if (cart?.defaultCurrency) {
      setCurrentCurrency(cart.defaultCurrency)
    }
  }, [cart?.defaultCurrency])

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

  return {
    currencies: currencies || [],
    loading,
    currentCurrency,
    onChangeCurrency,
  }
}
