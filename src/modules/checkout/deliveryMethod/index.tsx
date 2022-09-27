import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { ShippingType, useUpdateCartMutation } from '@/apollo'
import { useAuth } from '@/hooks'
import { PAGES, CHECKOUT_STEPS } from '@/constants'
import CheckoutLayout from '../checkoutLayout'
import Header from './header'
import Services from './services'
import Methods from './methods'
import ExpeditingService from './expeditingService'
import ExpeditingServiceQuestions from './expeditingServiceQuestions'

const step = 1

const DeliveryMethod: React.FC = () => {
  const router = useRouter()
  const { me, cart, updateMe } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [shippingType, setShippingType] = useState<ShippingType>(
    cart?.shippingType ?? ShippingType.From3To6,
  )
  const [isExpediting, setIsExpediting] = useState<boolean | undefined>()
  const [expeditingAnswers, setExpeditingAnswers] = useState<
    Record<string, string> | undefined
  >()
  const [updateCart] = useUpdateCartMutation()

  useEffect(() => {
    setShippingType(cart?.shippingType ?? ShippingType.From3To6)
  }, [cart])

  useEffect(() => {
    if (isExpediting !== undefined || me?.country !== 'US') return

    setIsExpediting(true)
  }, [isExpediting, me?.country])

  useEffect(() => {
    if (expeditingAnswers || !isExpediting) return

    setExpeditingAnswers(JSON.parse(cart?.expeditingService || '{}'))
  }, [cart?.expeditingService, expeditingAnswers, isExpediting])

  const onSubmit = useCallback(async () => {
    setLoading(true)
    const { data } = await updateCart({
      variables: {
        data: {
          shippingType,
          expeditingService: isExpediting
            ? JSON.stringify(expeditingAnswers)
            : null,
        },
      },
    })
    setLoading(false)
    const _cart = data?.UpdateCart.data
    if (_cart) {
      updateMe({ cart: _cart })
      await router.push(PAGES.checkout.shipping)
    }
  }, [
    expeditingAnswers,
    isExpediting,
    router,
    shippingType,
    updateCart,
    updateMe,
  ])

  const onChangeAnswers = useCallback((q: string, a: string) => {
    setExpeditingAnswers((prev) => ({ ...prev, [q]: a }))
  }, [])

  return (
    <CheckoutLayout
      step={step}
      steps={CHECKOUT_STEPS.steps}
      loading={loading}
      backLink={PAGES.cart}
      onSubmit={onSubmit}
      completeStep={0}>
      <>
        <div className="form-wrap">
          {me?.country === 'US' && (
            <div className="checkout-element-title">
              <div>1</div>Choose Delivery Method
            </div>
          )}
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
          {me?.country === 'US' && (
            <>
              <ExpeditingService
                optIn={isExpediting}
                onChange={setIsExpediting}
              />
            </>
          )}
          {isExpediting && (
            <ExpeditingServiceQuestions
              values={expeditingAnswers || {}}
              onChange={onChangeAnswers}
            />
          )}
        </div>
      </>
    </CheckoutLayout>
  )
}

export default DeliveryMethod
