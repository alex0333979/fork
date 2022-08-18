import React from 'react'
import { useRouter } from 'next/router'
import { useElements, useStripe } from '@stripe/react-stripe-js'

import { useAuth, useCurrency, usePayment } from '@/hooks'
import { PAGES } from '@/constants'
import CheckoutLayout from '../checkoutLayout'
import PaymentStatus from './paymentStatus'
import OrderSummary from './orderSummary'
import PaymentButtons from './paymentButtons'
import PayWithCard from './payWithCard'

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
    onPayDone: () => router.push(PAGES.checkout.thankYou),
  })

  return (
    <CheckoutLayout
      step={4}
      loading={loading}
      backLink={PAGES.checkout.payment}
      nextButtonText="Check out"
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
