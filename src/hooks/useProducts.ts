import { useContext } from 'react'

import { ProductsContext } from '@/contexts'

export const useProducts = () => useContext(ProductsContext)
