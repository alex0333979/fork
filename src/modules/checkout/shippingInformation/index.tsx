import React, { useMemo } from 'react'
import { useRouter } from 'next/router'

import { useSetShippingInfo } from '@/hooks'
import { PAGES, CHECKOUT_STEPS } from '@/constants'
import { IStep } from '@/components/elements/processStep'
import CheckoutLayout from '../checkoutLayout'
import FormElement from './formElement'

const step = 2

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

  const steps = useMemo(() => {
    const getFields = (s: IStep) => {
      if (s.step !== step) return 0

      return Object.values(shippingForm)?.filter(
        (f) => !f.disabled && !f.hidden,
      ).length
    }

    const getCompleted = (s: IStep) => {
      if (s.step !== step) return 0

      return Object.values(shippingForm).filter(
        (f) => !f.disabled && !f.hidden && !!f.value,
      ).length
    }

    return CHECKOUT_STEPS.steps.map((s) => ({
      ...s,
      fieldsCount: getFields(s),
      completedFields: getCompleted(s),
    }))
  }, [shippingForm])

  return (
    <CheckoutLayout
      key={refreshKey}
      step={step}
      steps={steps}
      loading={loading}
      backLink={PAGES.checkout.deliveryMethod}
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
