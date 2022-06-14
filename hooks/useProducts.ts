import { useCallback, useEffect, useState } from 'react'

import { useAuth } from '@/lib/auth'
import {
  Maybe,
  Product,
  CurrencyCode,
  ProductSku,
  useProductsLazyQuery,
} from '@/generated/graphql'

export const useProducts = () => {
  const { cart } = useAuth()

  const [products, setProducts] = useState<Product[]>([])

  const [fetchProducts, { loading }] = useProductsLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      setProducts(res?.Products?.data || [])
    },
  })

  useEffect(() => {
    fetchProducts({
      variables: {
        currencyCode: cart?.defaultCurrency?.code || CurrencyCode.Us,
      },
    })
  }, [cart?.defaultCurrency?.code, fetchProducts])

  const getProduct = useCallback(
    (sku: Maybe<ProductSku> | undefined): Product | undefined =>
      products.find((p) => p.sku === sku),
    [products],
  )

  return { products, loading, getProduct }
}
