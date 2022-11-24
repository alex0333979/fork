import { useContext } from 'react'

import { CheckoutContext } from '@/modules/checkout/checkoutContext'

export const useCheckout = () => useContext(CheckoutContext)
