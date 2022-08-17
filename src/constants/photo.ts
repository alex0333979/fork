import { PAGES } from './pages'

export const PHOTO_STEP = {
  steps: [
    {
      name: 'Take Photo',
      key: 'take-photo',
      step: 1,
      link: PAGES.photo.takePhoto,
    },
    {
      name: 'Biometric Verification',
      key: 'verification',
      step: 2,
      link: PAGES.photo.takePhoto,
    },
    {
      name: 'Checkout & Delivery',
      key: 'checkout',
      step: 3,
      link: PAGES.checkout.index,
    },
  ],
}

export const CHECKOUT_STEP = {
  steps: [
    {
      name: 'Select type',
      key: 'select-type',
      step: 1,
      link: PAGES.home,
    },
    {
      name: 'Photo processing',
      key: 'verification',
      step: 2,
      link: PAGES.photo.takePhoto,
    },
    {
      name: 'Checkout & Delivery',
      key: 'checkout',
      step: 3,
      link: PAGES.checkout.index,
    },
  ],
}
