import { ProcessStepsProps } from '@/components/elements/processStep'

import { PAGES } from './pages'

export const CHECKOUT_STEPS: ProcessStepsProps = {
  title: 'New passport application',
  completeStep: 0,
  step: 1,
  steps: [
    {
      name: 'Shipping Information',
      step: 1,
      link: PAGES.checkout.index,
    },
    {
      name: 'Payment Information',
      step: 2,
      link: PAGES.checkout.payment,
    },
    {
      name: 'Delivery Method',
      step: 3,
      link: PAGES.checkout.deliveryMethod,
    },
    {
      name: 'Review and Pay',
      step: 4,
      link: PAGES.checkout.review,
    },
  ],
}
