import React from 'react'
import { useRouter } from 'next/router'

import { useSetShippingInfo } from '@/hooks'
import { PAGES } from '@/constants'
import CheckoutLayout from '../checkoutLayout'
import FormElement from './formElement'

const ShippingInformation: React.FC = () => {
  const router = useRouter()

  const {
    refreshKey,
    loading,
    error,
    country,
    shippingForm,
    onValueChange,
    onSelectCountry,
    onSubmit,
  } = useSetShippingInfo({
    onSubmitted: () => {
      router.push(PAGES.checkout.payment)
    },
  })

  return (
    <CheckoutLayout
      key={refreshKey}
      step={2}
      loading={loading}
      backLink={PAGES.checkout.index}
      onSubmit={onSubmit}
      completeStep={1}>
      <div className="form-wrap">
        <div className="form-fields">
          <div className="extra-info">
            <h3>Shipping Information</h3>
          </div>
        </div>
        <form>
          <div className="form-fields">
            {Object.keys(shippingForm).map((key) => (
              <FormElement
                key={key}
                field={shippingForm[key]}
                country={country}
                error={error[shippingForm[key].name]}
                onValueChange={onValueChange}
                onSelectCountry={onSelectCountry}
              />
            ))}
          </div>
        </form>
      </div>
    </CheckoutLayout>
  )
}

export default ShippingInformation
