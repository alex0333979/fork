import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { ShippingType, useSetShippingTypeToCartMutation } from '@/apollo'
import { useAuth } from '@/hooks'
import { PAGES, CHECKOUT_STEPS } from '@/constants'
import CheckoutLayout from '../checkoutLayout'
import Header from './header'
import Services from './services'
import Methods from './methods'

const step = 3

const DeliveryMethod: React.FC = () => {
  const router = useRouter()
  const { cart, updateMe } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [shippingType, setShippingType] = useState<ShippingType>(
    cart?.shippingType ?? ShippingType.From3To6,
  )
  const [setShippingTypeToCart] = useSetShippingTypeToCartMutation()

  useEffect(() => {
    setShippingType(cart?.shippingType ?? ShippingType.From3To6)
  }, [cart])

  const onSubmit = useCallback(async () => {
    setLoading(true)
    const { data } = await setShippingTypeToCart({
      variables: { shippingType },
    })
    setLoading(false)
    const cart = data?.SetShippingTypeToCart.data
    if (cart) {
      updateMe({ cart })
      await router.push(PAGES.checkout.review)
    }
  }, [router, setShippingTypeToCart, shippingType, updateMe])

  return (
    <CheckoutLayout
      step={step}
      steps={CHECKOUT_STEPS.steps}
      loading={loading}
      backLink={PAGES.checkout.payment}
      onSubmit={onSubmit}
      completeStep={0}>
      <div className="form-wrap">
        <Header
          shippingType={shippingType}
          onChangeShippingType={setShippingType}
        />
        <div className="shipping-data">
          <ol>
            <Services shippingType={shippingType} />
            <Methods
              shippingType={shippingType}
              onChangeShippingType={setShippingType}
            />
          </ol>
        </div>
      </div>
    </CheckoutLayout>
  )
}

export default DeliveryMethod
