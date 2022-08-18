import React, { useCallback, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useElements, useStripe } from '@stripe/react-stripe-js'

import { ShippingType } from '@/apollo'
import { useOneClickCheckout, useCurrency, useAuth, usePayment } from '@/hooks'
import FormElement from '@/modules/checkout/shippingInformation/formElement'
import CheckBox from '@/components/elements/checkBox'
import PaymentStatus from '@/modules/checkout/review/paymentStatus'
import PaymentButtons from '@/modules/checkout/review/paymentButtons'
import PayWithCard from '@/modules/checkout/review/payWithCard'
import OneClickCheckoutLayout from './oneClickCheckoutLayout'
import CheckoutTotalInfo from './checkoutTotalInfo'

interface Props {
  onBack: () => void
  onPayDone: () => void
}

const CheckoutForm: React.FC<Props> = ({ onBack, onPayDone }) => {
  const { t } = useTranslation()
  const { currentCurrency } = useCurrency()
  const { cart } = useAuth()
  const stripe = useStripe()
  const stripeElements = useElements()

  const [loading, setLoading] = useState<boolean>(false)

  const {
    billingForm,
    country,
    error: billingInfoError,
    onValueChange,
    onSelectCountry,
    onSubmit: onSubmitBillingInfo,
  } = useOneClickCheckout()

  const {
    cardName,
    payment,
    shippingPrice,
    subTotal,
    total,
    paymentRequest,
    error: paymentError,
    stripeFocus,
    submitDisabled,
    onSetError,
    onInputChange,
    onSubmit: onPay,
    onFocusStripe,
  } = usePayment({
    stripe,
    stripeElements,
    shippingType: cart?.shippingType,
    items: cart?.items && cart.items[0] ? [cart.items[0]] : [],
    billingAddressState: billingForm.state.value,
    onPayDone: () => {
      setLoading(false)
      onPayDone()
    },
  })

  const renderFormElement = useCallback(
    (field: string) => {
      if (field === 'shippingType') {
        return (
          <CheckBox
            key={field}
            className={billingForm[field].size || ''}
            text={
              <Trans
                i18nKey={billingForm[field].text || ''}
                values={{
                  value: t('currency', {
                    value: shippingPrice,
                    currency: currentCurrency.label,
                  }),
                }}
                components={{
                  comp: <span className="free-sipping-price" />,
                }}
              />
            }
            value={billingForm[field].value === ShippingType.Free}
            onChange={(checked: boolean) =>
              onValueChange(
                billingForm[field].name,
                checked ? ShippingType.Free : ShippingType.NoShipping,
              )
            }
          />
        )
      }
      if (field === 'confirmPP') {
        return (
          <CheckBox
            key={field}
            className={billingForm[field].size || ''}
            text={t(billingForm[field].text || '')}
            value={!!billingForm[field].value}
            onChange={(checked: boolean) =>
              onValueChange(billingForm[field].name, checked)
            }
          />
        )
      }

      return (
        <FormElement
          key={`${field}-${country}`}
          field={billingForm[field]}
          country={country}
          error={billingInfoError[billingForm[field].name]}
          onValueChange={onValueChange}
          onSelectCountry={onSelectCountry}
        />
      )
    },
    [
      billingForm,
      billingInfoError,
      country,
      currentCurrency.label,
      onSelectCountry,
      onValueChange,
      shippingPrice,
      t,
    ],
  )

  const onSubmitForm = useCallback(async () => {
    onSubmitBillingInfo(
      () => setLoading(true),
      async () => {
        onPay()
      },
    )
  }, [onPay, onSubmitBillingInfo])

  console.log({ billingForm })
  return (
    <OneClickCheckoutLayout
      step={3}
      loading={loading}
      onSubmit={onSubmitForm}
      onBack={onBack}
      submitDisabled={
        submitDisabled || !billingForm.confirmPP?.value || loading
      }
      nextButtonText="Pay with card">
      <div className="sub-title">
        <h3>Checkout</h3>
      </div>

      <div className="form-wrap">
        <PaymentStatus status={payment.status} error={paymentError.result} />
        <form>
          <div className="form-fields">
            {Object.keys(billingForm).map((field: string) =>
              renderFormElement(field),
            )}
          </div>
        </form>
      </div>
      {!!paymentRequest && <PaymentButtons paymentRequest={paymentRequest} />}
      <PayWithCard
        error={paymentError}
        cardName={cardName}
        stripeFocus={stripeFocus}
        onChangeStripeFocus={onFocusStripe}
        onChangeError={onSetError}
        onInputChange={onInputChange}
      />
      <CheckoutTotalInfo subtotal={subTotal} total={total} />
    </OneClickCheckoutLayout>
  )
}

export default CheckoutForm
