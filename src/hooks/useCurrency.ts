import { useContext } from 'react'

import { CurrencyCode, CurrencyType } from '@/apollo'
import { CurrencyContext } from '@/contexts'

export const useCurrency = () => {
  const {
    currencies,
    currentCurrency,
    loading,
    onChangeCurrency,
    onChangeCurrencyByCountry,
  } = useContext(CurrencyContext)

  return {
    currencies: currencies || [],
    currentCurrency: currentCurrency || {
      code: CurrencyCode.Us,
      label: CurrencyType.Usd,
      symbol: '$',
    },
    loading,
    onChangeCurrency,
    onChangeCurrencyByCountry,
  }
}
