import { useCallback, useEffect, useState } from 'react'

import {
  FormField,
  ShippingType,
  useAddShippingAddressToCartMutation,
} from '@/apollo'
import { formValidation } from '@/utils'
import { ValidationError } from '@/types'
import { useAuth, useLocation } from '@/hooks'
import { ONE_CLICK__BILLING_FORM } from '@/constants'

interface IUseSetShippingInfo {
  onSubmitted: () => void
}

export const useOneClickCheckout = ({ onSubmitted }: IUseSetShippingInfo) => {
  const { cart, updateMe, me } = useAuth()
  const { country: defaultCountry } = useLocation()
  const [billingForm, setBillingForm] = useState<{
    [key: string]: FormField
  }>(ONE_CLICK__BILLING_FORM)
  const [country, setCountry] = useState<string | undefined>()
  const [shippingType, setShippingType] = useState<ShippingType>(
    ShippingType.NoShipping,
  )
  const [error, setError] = useState<ValidationError>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshKey, setRefreshKey] = useState<number>(new Date().getTime())
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
    setRefreshKey(new Date().getTime())
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

  const onSubmit = useCallback(async () => {
    const error = formValidation(
      Object.keys(billingForm).map((key) => billingForm[key]),
      country,
    )
    setError(error)
    if (Object.keys(error).length > 0) return

    const shippingAddress: any = {}
    Object.keys(billingForm).map((key) => {
      shippingAddress[key] = billingForm[key].value
    })
    setLoading(true)
    const { data } = await addShippingAddress({
      variables: { shippingAddress },
    })
    setLoading(false)
    const cart = data?.AddShippingAddressToCart.data
    if (cart) {
      updateMe({ cart })
      onSubmitted()
    }
  }, [addShippingAddress, billingForm, country, onSubmitted, updateMe])

  return {
    refreshKey,
    loading,
    error,
    country,
    billingForm,
    shippingType,
    onChangeShippingType: () =>
      setShippingType(
        shippingType === ShippingType.NoShipping
          ? ShippingType.Free
          : ShippingType.NoShipping,
      ),
    onValueChange,
    onSelectCountry,
    onSubmit,
  }
}
