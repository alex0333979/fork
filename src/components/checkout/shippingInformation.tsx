import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CheckoutLayout from '@/components/checkout/checkoutLayout'
import {
  FieldType,
  FormField,
  useAddShippingAddressToCartMutation,
} from '@/apollo'
import TextInput from '@/components/elements/textInput'
import PhoneInput from '@/components/elements/phoneInput'
import SelectBox from '@/components/elements/selectBox'
import CountryPicker from '@/components/elements/countryPicker'
import StatePicker from '@/components/elements/statePicker'
import AppDatePicker from '@/components/elements/datePicker'
import { PAGES, SHIPPING_BILLING_FORM } from '../../constants'
import { formValidation } from '@/utils'
import { ValidationError } from '@/types'
import { useAuth } from '@/hooks'
import { useLocation } from '@/hooks'

const ShippingInformation: React.FC = () => {
  const router = useRouter()
  const { cart, updateCart, me } = useAuth()
  const { country: defaultCountry } = useLocation()
  const [shippingForm, setShippingForm] = useState<{
    [key: string]: FormField
  }>(SHIPPING_BILLING_FORM)
  const [country, setCountry] = useState<string | undefined>()
  const [error, setError] = useState<ValidationError>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshKey, setRefreshKey] = useState<number>(new Date().getTime())
  const [addShippingAddress] = useAddShippingAddressToCartMutation()

  useEffect(() => {
    if (!country && me) {
      setCountry(me?.country || 'US')
    }
  }, [country, defaultCountry, me])

  const initializeForm = useCallback(() => {
    const initialForm = { ...SHIPPING_BILLING_FORM }
    const _shippingAddress: any = cart?.shippingAddress || me?.shippingAddress
    if (_shippingAddress) {
      Object.keys(_shippingAddress).map((key) => {
        if (key in initialForm) {
          initialForm[key].value = _shippingAddress[key]
        }
      })
    }

    setShippingForm({
      ...initialForm,
      country: {
        ...initialForm.country,
        defaultValue: me?.country || 'US',
        value: me?.country || 'US',
      },
    })
  }, [cart?.shippingAddress, me?.country, me?.shippingAddress])

  useEffect(() => {
    initializeForm()
    setRefreshKey(new Date().getTime())
  }, [initializeForm])

  const onValueChange = useCallback(
    (name: string, value: string | number | boolean | undefined) => {
      const _shippingForm = { ...shippingForm }
      _shippingForm[name].value = value
      setShippingForm(_shippingForm)
      setError({})
    },
    [shippingForm],
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
      Object.keys(shippingForm).map((key) => shippingForm[key]),
      country,
    )
    setError(error)
    if (Object.keys(error).length > 0) {
      return
    }
    const shippingAddress: any = {}
    Object.keys(shippingForm).map((key) => {
      shippingAddress[key] = shippingForm[key].value
    })
    setLoading(true)
    const { data } = await addShippingAddress({
      variables: { shippingAddress },
    })
    setLoading(false)
    const cart = data?.AddShippingAddressToCart.data
    if (cart) {
      updateCart(cart)
      await router.push(PAGES.checkout.payment)
    }
  }, [addShippingAddress, country, router, shippingForm, updateCart])

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
            <h3>{'Shipping Information'}</h3>
          </div>
        </div>
        <form>
          <div className="form-fields">
            {Object.keys(shippingForm).map((key) => {
              const field = shippingForm[key]
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

export default ShippingInformation
