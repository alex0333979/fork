import { CouponType } from '@/apollo'
import { ProcessStepsProps } from '@/components/elements/processStep'

import { PAGES } from './pages'

export const CHECKOUT_STEPS: ProcessStepsProps = {
  title: 'New passport application',
  completeStep: 0,
  step: 1,
  steps: [
    {
      id: 'delivery_method',
      name: 'Delivery Method',
      step: 1,
      link: PAGES.checkout.deliveryMethod,
      prev: PAGES.cart,
      next: PAGES.checkout.shipping,
    },
    {
      id: 'shipping_information',
      name: 'Shipping Information',
      step: 2,
      link: PAGES.checkout.shipping,
      prev: PAGES.checkout.deliveryMethod,
      next: PAGES.checkout.payment,
    },
    {
      id: 'payment_information',
      name: 'Payment Information',
      step: 3,
      link: PAGES.checkout.payment,
      prev: PAGES.checkout.shipping,
      next: PAGES.checkout.review,
    },
    {
      id: 'review_and_pay',
      name: 'Review and Pay',
      step: 4,
      link: PAGES.checkout.review,
      prev: PAGES.checkout.payment,
      next: PAGES.checkout.thankYou,
    },
  ],
}

export const COUPON_VALUES = {
  [CouponType.Mg33Sl]: {
    percentage: 15,
  },
  [CouponType.Tvp13Rzggh3]: {
    percentage: 23.3,
  },
}
