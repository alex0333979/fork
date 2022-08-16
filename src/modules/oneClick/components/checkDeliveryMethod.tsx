import React, { useCallback, useEffect, useState } from 'react'

import { ShippingType, useSetShippingTypeToCartMutation } from '@/apollo'
import { useAuth } from '@/hooks'
import { CHECKOUT_STEPS } from '@/constants'

import ProcessStep from '@/components/elements/processStep'
import Header from '@/modules/checkout/deliveryMethod/header'
import Services from '@/modules/checkout/deliveryMethod/services'
import Methods from '@/modules/checkout/deliveryMethod/methods'
import BottomButtons from './bottomButtons'

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
    <div className="cart-page">
      <div className="page-title">
        <div className="container">
          <div className="data-wrap">
            <h1>Checkout</h1>
          </div>
        </div>
      </div>
      <div className="floating-wrap">
        <div className="application-form">
          <div className="container">
            <div className="data-wrap horizontal">
              <ProcessStep
                title={CHECKOUT_STEPS.title}
                step={1}
                steps={CHECKOUT_STEPS.steps}
                completeStep={0}
              />
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
            </div>
          </div>
        </div>
        <BottomButtons
          loading={loading}
          submitDisabled={false}
          onBack={onBack}
          onNext={onSubmit}
        />
      </div>
    </div>
  )
}

export default CheckDeliveryMethod
