import React, { useCallback, useEffect, useState } from 'react'

import { ShippingType, useSetShippingTypeToCartMutation } from '@/apollo'
import { useAuth } from '@/hooks'

import Header from '@/modules/checkout/deliveryMethod/header'
import Services from '@/modules/checkout/deliveryMethod/services'
import Methods from '@/modules/checkout/deliveryMethod/methods'
import OneClickCheckoutLayout from './oneClickCheckoutLayout'

interface Props {
  onSetShippingInfo: () => void
  onSetBillingInfo: () => void
  onBack: () => void
}

const CheckDeliveryMethod: React.FC<Props> = ({
  onSetShippingInfo,
  onSetBillingInfo,
  onBack,
}) => {
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
      if (cart.shippingType === ShippingType.NoShipping) {
        onSetBillingInfo()
      } else {
        onSetShippingInfo()
      }
    }
  }, [
    onSetBillingInfo,
    onSetShippingInfo,
    setShippingTypeToCart,
    shippingType,
    updateMe,
  ])

  return (
    <OneClickCheckoutLayout
      step={1}
      completedStep={0}
      loading={loading}
      onSubmit={onSubmit}
      onBack={onBack}
      submitDisabled={false}
      nextButtonText="Next">
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
    </OneClickCheckoutLayout>
  )
}

export default CheckDeliveryMethod
