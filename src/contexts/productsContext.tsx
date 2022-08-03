import React, { useCallback, useEffect, useState, createContext } from 'react'

import {
  Maybe,
  Product,
  CurrencyCode,
  ProductSku,
  useProductsLazyQuery,
} from '@/apollo'
import { useAuth } from '@/hooks'

interface IProductsContext {
  products: Product[]
  loading: boolean
  getProduct: (sku: Maybe<ProductSku> | undefined) => Product | undefined
}

export const ProductsContext = createContext<IProductsContext>({
  products: [],
  loading: false,
  getProduct: () => undefined,
})

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

  return (
    <ProductsContext.Provider value={{ products, loading, getProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}
