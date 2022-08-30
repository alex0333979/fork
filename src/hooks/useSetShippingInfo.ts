import { useCallback, useEffect, useState } from 'react'

import { FormField, useAddShippingAddressToCartMutation } from '@/apollo'
import { formValidation } from '@/utils'
import { ValidationError } from '@/types'
import { useAuth, useLocation } from '@/hooks'
import { SHIPPING_BILLING_FORM } from '@/constants'

interface IUseSetShippingInfo {
  onSubmitted: () => void
}

export const useSetShippingInfo = ({ onSubmitted }: IUseSetShippingInfo) => {
  const { cart, updateMe, me } = useAuth()
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
      setCountry(defaultCountry?.value || me?.country || 'US')
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

  const onSelectCountry = useCallback(
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
    if (Object.keys(error).length > 0) return

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
      updateMe({ cart })
      onSubmitted()
    }
  }, [addShippingAddress, country, onSubmitted, shippingForm, updateMe])

  return {
    refreshKey,
    loading,
    error,
    country,
    shippingForm,
    onValueChange,
    onSelectCountry,
    onSubmit,
  }
}
