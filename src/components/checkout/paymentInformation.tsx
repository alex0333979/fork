import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CheckoutLayout from '@/components/checkout/checkoutLayout'
import {
  FieldType,
  FormField,
  useAddBillingAddressToCartMutation,
} from '@/apollo'
import { PAGES, SHIPPING_BILLING_FORM } from '../../constants'
import { useAuth } from '@/hooks'
import TextInput from '@/components/elements/textInput'
import PhoneInput from '@/components/elements/phoneInput'
import SelectBox from '@/components/elements/selectBox'
import CountryPicker from '@/components/elements/countryPicker'
import StatePicker from '@/components/elements/statePicker'
import AppDatePicker from '@/components/elements/datePicker'
import { formValidation } from '@/utils'
import { ValidationError } from '@/types'
import CheckBox from '@/components/elements/checkBox'

const PaymentInformation: React.FC = () => {
  const router = useRouter()
  const { cart, updateMe, me } = useAuth()
  const [billingForm, setBillingForm] = useState<{ [key: string]: FormField }>(
    SHIPPING_BILLING_FORM,
  )
  const [country, setCountry] = useState<string | undefined>()
  const [error, setError] = useState<ValidationError>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshKey, setRefreshKey] = useState<number>(new Date().getTime())
  const [sameAddress, setSameAddress] = useState<boolean>(true)
  const [addBillingAddress] = useAddBillingAddressToCartMutation()

  const initializeForm = useCallback(() => {
    // This is ridiculous otherwise, const object will be changed
    Object.keys(SHIPPING_BILLING_FORM).map((key) => {
      SHIPPING_BILLING_FORM[key].value = null
    })

    const initialForm = { ...SHIPPING_BILLING_FORM }
    const _billingAddress: any | undefined = sameAddress
      ? cart?.shippingAddress
      : cart?.billingAddress || me?.billingAddress
    if (_billingAddress) {
      Object.keys(_billingAddress).map((key) => {
        if (key in initialForm) {
          initialForm[key].value = _billingAddress[key]
        }
      })
    }
    setCountry(initialForm?.country?.value || 'US')
    setBillingForm(initialForm)
    setRefreshKey(new Date().getTime())
  }, [
    cart?.billingAddress,
    cart?.shippingAddress,
    me?.billingAddress,
    sameAddress,
  ])

  useEffect(() => {
    initializeForm()
  }, [initializeForm])

  const onChangeSameAddress = useCallback(
    (status: boolean) => {
      setSameAddress(status)
      if (status) {
        const _billingForm = { ...billingForm }
        const cartShippingAddress: any = cart?.shippingAddress
        if (cartShippingAddress) {
          Object.keys(_billingForm).map((key) => {
            _billingForm[key].value = cartShippingAddress[key]
          })
        }
        setBillingForm(_billingForm)
      } else {
        initializeForm()
      }
    },
    [billingForm, cart?.shippingAddress, initializeForm],
  )

  const onValueChange = useCallback(
    (name: string, value: string | number | boolean | undefined) => {
      const _billingForm = { ...billingForm }
      _billingForm[name].value = value
      setBillingForm(_billingForm)
      setError({})
    },
    [billingForm],
  )

  const onSelectedCountry = useCallback(
    (name: string, value: string) => {
      onValueChange(name, value)
      setCountry(value)
    },
    [onValueChange],
  )

  const onSubmit = useCallback(async () => {
    const error = formValidation(
      Object.keys(billingForm).map((key) => billingForm[key]),
      country,
    )
    setError(error)
    if (Object.keys(error).length > 0) {
      return
    }
    const billingAddress: any = {}
    Object.keys(billingForm).map((key) => {
      billingAddress[key] = billingForm[key].value
    })

    setLoading(true)
    const { data } = await addBillingAddress({ variables: { billingAddress } })
    setLoading(false)
    const cart = data?.AddBillingAddressToCart.data
    if (cart) {
      updateMe({ cart })
      await router.push(PAGES.checkout.review)
    }
  }, [addBillingAddress, billingForm, country, router, updateMe])

  return (
    <CheckoutLayout
      key={refreshKey}
      step={3}
      loading={loading}
      backLink={PAGES.checkout.shipping}
      onSubmit={onSubmit}
      completeStep={2}>
      <div className="form-wrap">
        <div className="form-fields">
          <div className="extra-info">
            <h3>{'Payment Information'}</h3>
          </div>
        </div>
        <form>
          <div className="form-fields">
            <CheckBox
              text={'Billing address Is the same with shipping address'}
              value={sameAddress}
              onChange={onChangeSameAddress}
            />
            {Object.keys(billingForm).map((key) => {
              const field = billingForm[key]
              switch (field.type) {
                case FieldType.Input:
                  return (
                    <TextInput
                      key={key}
                      formField={field}
                      onValueChange={onValueChange}
                      error={error[field.name]}
                    />
                  )
                case FieldType.PhoneInput:
                  return (
                    <PhoneInput
                      key={key}
                      country={country}
                      formField={field}
                      onValueChange={onValueChange}
                      error={error[field.name]}
                    />
                  )
                case FieldType.Select:
                  return (
                    <SelectBox
                      key={key}
                      formField={field}
                      onValueChange={onValueChange}
                      error={error[field.name]}
                    />
                  )
                case FieldType.CountryPicker:
                  return (
                    <CountryPicker
                      key={key}
                      formField={field}
                      selectedCountry={onSelectedCountry}
                      error={error[field.name]}
                    />
                  )
                case FieldType.StatePicker:
                  return (
                    <StatePicker
                      key={key}
                      formField={field}
                      selectedState={onValueChange}
                      country={country}
                      error={error[field.name]}
                    />
                  )
                case FieldType.DatePicker:
                  return (
                    <AppDatePicker
                      key={key}
                      formField={field}
                      onValueChange={onValueChange}
                      error={error[field.name]}
                    />
                  )
              }
            })}
          </div>
        </form>
      </div>
    </CheckoutLayout>
  )
}

export default PaymentInformation
