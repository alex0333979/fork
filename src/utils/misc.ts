import { CouponType, FormStep } from '@/apollo'
import { COUPON_VALUES } from '@/constants'

import { IEntry } from '@/modules/application/applicationForm/types'

export const cleanEntry = (entry: IEntry): IEntry => {
  const steps: FormStep[] = []

  entry?.form?.steps?.forEach((step) => {
    const fields = step.fields.map((field) => ({
      ...field,
      defaultValue: field.defaultValue ?? undefined,
      value: field.value ?? undefined,
    }))

    steps.push({ ...step, fields })
  })

  return { ...(entry || {}), form: { ...entry.form, steps } }
}

export const applyCouponToPrice = (
  price: number,
  coupon: CouponType | undefined | null,
): [number, number] => {
  if (!coupon) return [price, 0]
  const couponValue: number | undefined = COUPON_VALUES[coupon].percentage

  if (couponValue === undefined) return [price, 0]

  const discounted = Math.floor(price * couponValue) / 100
  return [price - discounted, discounted]
}
