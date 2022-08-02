import { PAGES } from './pages'

export const PHOTO_STEP = {
  step: 1,
  steps: [
    {
      name: 'Take Photo',
      step: 1,
      link: PAGES.photo.takePhoto,
    },
    {
      name: 'Biometric Verification',
      step: 2,
      link: PAGES.photo.takePhoto,
    },
    {
      name: 'Checkout & Delivery',
      step: 3,
      link: PAGES.photo.processPhoto,
    },
  ],
}
