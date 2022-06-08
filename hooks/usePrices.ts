import { useEffect, useState } from 'react'

import { useAuth } from '@/lib/auth'
import { CartPrice, useCartPricesLazyQuery } from '@/generated/graphql'

export const usePrices = () => {
  const { currency } = useAuth()

  const [prices, setPrices] = useState<CartPrice[]>([])

  const [fetchCartPrices, { loading }] = useCartPricesLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      setPrices(res?.CartPrices?.data || [])
    },
  })

  useEffect(() => {
    if (!currency?.value) return
    fetchCartPrices({
      variables: {
        currencyValue: currency.value,
      },
    })
  }, [currency?.value, fetchCartPrices])

  return { prices, loading }
}
