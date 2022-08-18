import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { FieldType, ShippingType } from '@/apollo'
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

  const {
    billingForm,
    country,
    shippingType,
    error: billingInfoError,
    onChangeShippingType,
    onValueChange,
    onSelectCountry,
  } = useOneClickCheckout({
    onSubmitted: () => null,
  })

  const {
    cardName,
    payment,
    shippingPrice,
    subTotal,
    total,
    paymentRequest,
    error: paymentError,
    loading,
    stripeFocus,
    submitDisabled,
    onSetError,
    onInputChange,
    onSubmit,
    onFocusStripe,
  } = usePayment({
    shippingType: cart?.shippingType,
    items: cart?.items && cart.items[0] ? [cart.items[0]] : [],
    billingAddressState: cart?.billingAddress?.state,
    onPayDone,
  })

  return (
    <OneClickCheckoutLayout
      step={3}
      loading={loading}
      onSubmit={onSubmit}
      onBack={onBack}
      submitDisabled={submitDisabled || !billingForm.confirmPP?.value}
      nextButtonText="Pay with card">
      <div className="sub-title">
        <h3>Checkout</h3>
      </div>

      <div className="form-wrap">
        <PaymentStatus status={payment.status} error={paymentError.result} />
        <form>
          <div className="form-fields">
            {Object.keys(billingForm).map((key) =>
              billingForm[key].type === FieldType.CheckBox ? (
                <CheckBox
                  key={key}
                  className={billingForm[key].size || ''}
                  text={
                    <Trans
                      i18nKey={billingForm[key].text || ''}
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
                  value={shippingType === ShippingType.Free}
                  onChange={() => onChangeShippingType()}
                />
              ) : (
                <FormElement
                  key={`${key}-${country}`}
                  field={billingForm[key]}
                  country={country}
                  error={billingInfoError[billingForm[key].name]}
                  onValueChange={onValueChange}
                  onSelectCountry={onSelectCountry}
                />
              ),
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
