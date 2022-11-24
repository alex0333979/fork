import React, { useEffect, useMemo, useState } from 'react'

import { CHECKOUT_STEPS, PAGES } from '@/constants'
import { ProcessStepsProps, IStep } from '@/components/elements/processStep'

import { ShippingType } from '@/apollo'
import { useAuth } from '@/hooks'

interface ICheckoutContext {
  shippingType: ShippingType
  checkoutSteps: ProcessStepsProps
  onChangeShippingType: (v: ShippingType) => void
}

export const CheckoutContext = React.createContext<ICheckoutContext>({
  shippingType: ShippingType.From3To6,
  checkoutSteps: CHECKOUT_STEPS,
  onChangeShippingType: () => null,
})

export const CheckoutContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { cart } = useAuth()
  const [shippingType, setShippingType] = useState<ShippingType>(
    cart?.shippingType ?? ShippingType.From3To6,
  )

  useEffect(() => {
    setShippingType(cart?.shippingType ?? ShippingType.From3To6)
  }, [cart])

  const checkoutSteps: ProcessStepsProps = useMemo(() => {
    if (shippingType !== ShippingType.NoShipping) return CHECKOUT_STEPS

    const steps: IStep[] = []
    CHECKOUT_STEPS.steps.forEach((s) => {
      if (s.id === 'delivery_method') {
        steps.push({ ...s, next: PAGES.checkout.payment })
      } else if (s.id === 'payment_information') {
        steps.push({ ...s, step: 2, prev: PAGES.checkout.deliveryMethod })
      } else if (s.id === 'review_and_pay') {
        steps.push({ ...s, step: 3 })
      }
    })

    return { ...CHECKOUT_STEPS, steps }
  }, [shippingType])

  const value = useMemo(
    () => ({
      checkoutSteps,
      shippingType,
      onChangeShippingType: (v: ShippingType) => setShippingType(v),
    }),
    [checkoutSteps, shippingType],
  )

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  )
}
