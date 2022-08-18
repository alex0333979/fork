import { useCallback, useEffect, useState } from 'react'

import { FormField, ShippingType, useAddShippingAddressToCartMutation } from '@/apollo'
import { formValidation } from '@/utils'
import { ValidationError } from '@/types'
import { useAuth, useLocation } from '@/hooks'
import { ONE_CLICK__BILLING_FORM } from '@/constants'

export const useOneClickCheckout = () => {
  const { cart, updateMe, me } = useAuth()
  const { country: defaultCountry } = useLocation()
  const [billingForm, setBillingForm] = useState<{
    [key: string]: FormField
  }>(ONE_CLICK__BILLING_FORM)
  const [country, setCountry] = useState<string | undefined>()
  const [error, setError] = useState<ValidationError>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [addShippingAddress] = useAddShippingAddressToCartMutation()

  useEffect(() => {
    if (!country && me) {
      setCountry(defaultCountry?.value || me?.country || 'US')
    }
  }, [country, defaultCountry, me])

  const initializeForm = useCallback(() => {
    const initialForm = { ...ONE_CLICK__BILLING_FORM }
    const _billingAddress: any = cart?.billingAddress || me?.billingAddress
    if (_billingAddress) {
      Object.keys(_billingAddress).map((key) => {
        if (key in initialForm) {
          initialForm[key].value = _billingAddress[key]
        }
      })
    }

    setBillingForm({
      ...initialForm,
      country: {
        ...initialForm.country,
        defaultValue: me?.country || 'US',
        value: me?.country || 'US',
      },
    })
  }, [cart?.billingAddress, me?.billingAddress, me?.country])

  useEffect(() => {
    initializeForm()
  }, [initializeForm])

  const onValueChange = useCallback(
    (name: string, value: string | number | boolean | undefined) => {
      const _billingForm = { ...billingForm }
      _billingForm[name].value = value
      setBillingForm(_billingForm)
      setError({})
    },
    [billingForm],
  )

  const onSelectCountry = useCallback(
    (name: string, value: string) => {
      onValueChange(name, value)
      setCountry(value)
    },
    [onValueChange],
  )

  const onSubmit = useCallback(
    async (before: () => void, after: () => void) => {
      const error = formValidation(
        Object.keys(billingForm).map((key) => billingForm[key]),
        country,
      )
      setError(error)
      if (Object.keys(error).length > 0) return

      const shippingAddress: any = {}
      Object.keys(billingForm).map((key) => {
        if (key !== 'confirmPP') {
          if (key === 'shippingType') {
            shippingAddress[key] = billingForm[key].value || ShippingType.NoShipping
          } else {
            shippingAddress[key] = billingForm[key].value
          }
        }
      })
      before()
      console.log({ shippingAddress })
      setTimeout(() => {
        after()
      }, 3000)
      // setLoading(true)
      // const { data } = await addShippingAddress({
      //   variables: { shippingAddress },
      // })
      // // setLoading(false)
      // const cart = data?.AddShippingAddressToCart.data
      // if (cart) {
      //   updateMe({ cart })
      //   callback()
      // }
    },
    [addShippingAddress, billingForm, country, updateMe],
  )

  return {
    loading,
    error,
    country,
    billingForm,
    onValueChange,
    onSelectCountry,
    onSubmit,
  }
}
