import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useUpdateCartMutation } from '@/apollo'
import { useAuth, useCheckout } from '@/hooks'
import CheckoutLayout from '../checkoutLayout'
import Header from './header'
import Services from './services'
import Methods from './methods'
import ExpeditingService from './expeditingService'
import ExpeditingServiceQuestions from './expeditingServiceQuestions'

const DeliveryMethod: React.FC = () => {
  const router = useRouter()
  const { me, cart, updateMe } = useAuth()
  const { shippingType, checkoutSteps, onChangeShippingType } = useCheckout()
  const [loading, setLoading] = useState<boolean>(false)
  const [isExpediting, setIsExpediting] = useState<boolean | undefined>()
  const [expeditingAnswers, setExpeditingAnswers] = useState<
    Record<string, string> | undefined
  >()
  const [updateCart] = useUpdateCartMutation()

  useEffect(() => {
    if (isExpediting !== undefined || me?.country !== 'US') return

    setIsExpediting(true)
  }, [isExpediting, me?.country])

  useEffect(() => {
    if (expeditingAnswers || !isExpediting) return

    setExpeditingAnswers(JSON.parse(cart?.expeditingService || '{}'))
  }, [cart?.expeditingService, expeditingAnswers, isExpediting])

  const curStep = useMemo(
    () => checkoutSteps.steps.find((s) => s.id === 'delivery_method'),
    [checkoutSteps.steps],
  )

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
      await router.push(curStep!.next!)
    }
  }, [
    curStep,
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
      step={curStep!.step}
      steps={checkoutSteps.steps}
      loading={loading}
      backLink={curStep!.prev}
      onSubmit={onSubmit}
      completeStep={0}>
      <div className="form-wrap">
        <div className="shipping-title">
          <h3 className="checkout-element-title">Choose Delivery Method</h3>
        </div>
        {me?.country === 'CA' && (
          <>
            <Header
              shippingType={shippingType}
              onChangeShippingType={onChangeShippingType}
            />
          </>
        )}
        <div className="shipping-data">
          <ol>
            <Services shippingType={shippingType} />
            <Methods
              shippingType={shippingType}
              onChangeShippingType={onChangeShippingType}
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
    </CheckoutLayout>
  )
}

export default DeliveryMethod
