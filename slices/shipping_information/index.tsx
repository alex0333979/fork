import React, { useMemo } from 'react'
import { useRouter } from 'next/router'

import { useSetShippingInfo, useCheckout } from '@/hooks'
import { IStep } from '@/components/elements/processStep'
import CheckoutLayout from '@/modules/checkout/checkoutLayout'
import FormElement from '@/modules/checkout/shippingInformation/formElement'
import { CheckoutProps } from '@/pages/checkout/delivery-method'

const ShippingInformation: React.FC<CheckoutProps> = () => {
  const router = useRouter()
  const { checkoutSteps } = useCheckout()

  const curStep = useMemo(
    () => checkoutSteps.steps.find((s) => s.id === 'shipping_information'),
    [checkoutSteps.steps],
  )

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
      router.push(curStep!.next!)
    },
  })

  const steps = useMemo(() => {
    const getFields = (s: IStep) => {
      if (s.step !== curStep!.step) return 0

      return Object.values(shippingForm)?.filter(
        (f) => !f.disabled && !f.hidden,
      ).length
    }

    const getCompleted = (s: IStep) => {
      if (s.step !== curStep!.step) return 0

      return Object.values(shippingForm).filter(
        (f) => !f.disabled && !f.hidden && !!f.value,
      ).length
    }

    return checkoutSteps.steps.map((s) => ({
      ...s,
      fieldsCount: getFields(s),
      completedFields: getCompleted(s),
    }))
  }, [checkoutSteps.steps, curStep, shippingForm])

  return (
    <CheckoutLayout
      key={refreshKey}
      step={curStep!.step}
      steps={steps}
      loading={loading}
      backLink={curStep!.prev}
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
