import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useElements, useStripe } from '@stripe/react-stripe-js'

import { useAuth, useCurrency, usePayment } from '@/hooks'
import { PAGES, CHECKOUT_STEPS } from '@/constants'
import CheckoutLayout from '../checkoutLayout'
import PaymentStatus from './paymentStatus'
import OrderSummary from './orderSummary'
import PaymentButtons from './paymentButtons'
import PayWithCard from './payWithCard'

const step = 4

const ReviewAndPay: React.FC = () => {
  const { cart } = useAuth()
  const { currentCurrency } = useCurrency()
  const router = useRouter()
  const stripe = useStripe()
  const stripeElements = useElements()

  const {
    cardName,
    payment,
    conciergePrice,
    shippingPrice,
    subTotal,
    total,
    tax,
    paymentRequest,
    error,
    loading,
    stripeFocus,
    submitDisabled,
    onSetError,
    onInputChange,
    onSubmit,
    onFocusStripe,
  } = usePayment({
    stripe,
    stripeElements,
    shippingType: cart?.shippingType,
    items: cart?.items || [],
    billingAddressState: cart?.billingAddress?.state,
    callback: (isSuccess?: boolean) => {
      if (isSuccess) {
        router.push(PAGES.checkout.thankYou)
      }
    },
  })

  const steps = useMemo(
    () =>
      CHECKOUT_STEPS.steps.map((s) => ({
        ...s,
        fieldsCount: 2,
        completedFields: cardName ? 2 : 0,
      })),
    [cardName],
  )

  return (
    <CheckoutLayout
      step={step}
      steps={steps}
      loading={loading}
      backLink={PAGES.checkout.deliveryMethod}
      nextButtonText="Checkout"
      disableSubmit={submitDisabled}
      onSubmit={onSubmit}
      completeStep={3}>
      <div className="form-wrap">
        <PaymentStatus status={payment.status} error={error.result} />
        <div className="form-fields">
          <div className="extra-info">
            <h3>Review and Pay</h3>
          </div>
        </div>
        <OrderSummary
          currency={currentCurrency}
          conciergePrice={conciergePrice || 0}
          shippingPrice={shippingPrice || 0}
          subTotal={subTotal || 0}
          total={total || 0}
          tax={tax || 0}
        />
        {!!paymentRequest && <PaymentButtons paymentRequest={paymentRequest} />}

        <PayWithCard
          error={error}
          cardName={cardName}
          stripeFocus={stripeFocus}
          onChangeStripeFocus={onFocusStripe}
          onChangeError={onSetError}
          onInputChange={onInputChange}
        />
      </div>
    </CheckoutLayout>
  )
}

export default ReviewAndPay
