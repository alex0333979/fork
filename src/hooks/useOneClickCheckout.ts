import { useCallback, useEffect, useState } from 'react'

import { FormField, ShippingType, useAddOneClickInfoMutation } from '@/apollo'
import { formValidation } from '@/utils'
import { ValidationError } from '@/types'
import { useAuth, useLocation } from '@/hooks'
import { ONE_CLICK__BILLING_FORM } from '@/constants'
import { ICountry } from '@/components/elements/countrySelector'

interface IUseOneClickCheckout {
  initialCountry: ICountry | undefined
}

export const useOneClickCheckout = ({
  initialCountry,
}: IUseOneClickCheckout) => {
  const { cart, updateMe, me } = useAuth()
  const { country: defaultCountry } = useLocation()
  const [billingForm, setBillingForm] = useState<{
    [key: string]: FormField
  }>(ONE_CLICK__BILLING_FORM)
  const [country, setCountry] = useState<string | undefined>()
  const [error, setError] = useState<ValidationError>({})
  const [addInfo] = useAddOneClickInfoMutation()

  useEffect(() => {
    if (!country && me) {
      const _country =
        initialCountry?.value || defaultCountry?.value || me?.country || 'US'
      setCountry(_country)
    }
  }, [country, defaultCountry, initialCountry?.value, me])

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
        defaultValue: country || 'US',
        value: country || 'US',
      },
    })
  }, [cart?.billingAddress, country, me?.billingAddress])

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
    async (before: () => void, after: (isSuccess?: boolean) => void) => {
      const error = formValidation(
        Object.keys(billingForm).map((key) => billingForm[key]),
        country,
      )
      setError(error)
      if (Object.keys(error).length > 0) return

      const input: any = {}
      Object.keys(billingForm).map((key) => {
        if (key !== 'confirmPP') {
          if (key === 'shippingType') {
            input[key] = billingForm[key].value || ShippingType.NoShipping
          } else {
            input[key] = billingForm[key].value
          }
        }
      })
      before()
      const { data } = await addInfo({
        variables: { input },
      })
      const cart = data?.AddOneClickInfo.data
      if (cart) {
        updateMe({ cart })
        after(true)
      }
      after(false)
    },
    [addInfo, billingForm, country, updateMe],
  )

  return {
    error,
    country,
    billingForm,
    onValueChange,
    onSelectCountry,
    onSubmit,
  }
}
