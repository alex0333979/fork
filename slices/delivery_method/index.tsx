import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useUpdateCartMutation } from '@/apollo'
import { useAuth, useCheckout } from '@/hooks'
import CheckoutLayout from '@/modules/checkout/checkoutLayout'
import Header from '@/modules/checkout/deliveryMethod/header'
import Services from '@/modules/checkout/deliveryMethod/services'
import Methods from '@/modules/checkout/deliveryMethod/methods'
import ExpeditingService from '@/modules/checkout/deliveryMethod/expeditingService'
import ExpeditingServiceQuestions from '@/modules/checkout/deliveryMethod/expeditingServiceQuestions'
import { CheckoutSlice } from '@/pages/checkout/delivery-method'

const DeliveryMethod: React.FC<CheckoutSlice> = ({ slice }) => {
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

  return slice.slice_type === 'delivery_method' ? (
    <CheckoutLayout
      step={curStep!.step}
      steps={checkoutSteps.steps}
      loading={loading}
      slice={slice}
      backLink={curStep!.prev}
      onSubmit={onSubmit}
      completeStep={0}>
      <div className="form-wrap">
        <div className="shipping-title">
          <h3 className="checkout-element-title">
            {slice.primary.step_title[0].text}
          </h3>
        </div>
        {me?.country !== 'CA' && (
          <>
            <Header
              shippingType={shippingType}
              onChangeShippingType={onChangeShippingType}
              primary={slice.primary}
            />
          </>
        )}
        <div className="shipping-data">
          <ol>
            <Services shippingType={shippingType} primary={slice.primary} />
            <Methods
              shippingType={shippingType}
              onChangeShippingType={onChangeShippingType}
              slice={slice}
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
  ) : (
    <></>
  )
}

export default DeliveryMethod
