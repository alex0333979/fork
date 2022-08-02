import { NavItemProps } from '@/components/layout/navItem'

export const PAGES = {
  home: '/',
  application: {
    index: '/application/',
    create: '/application/create/',
  },
  checkout: {
    index: '/checkout/',
    deliveryMethod: '/checkout/',
    shipping: '/checkout/shipping/',
    payment: '/checkout/payment/',
    review: '/checkout/review/',
    thankYou: '/checkout/thank-you/',
  },
  cart: '/cart/',
  photo: {
    index: '/photo/',
    editPhoto: '/photo/edit-photo/',
    takePhoto: '/photo/take-photo/',
    takeNewPhoto: '/photo/take-new-photo/',
    processPhoto: '/photo/process-photo/',
  },
  contactUs: '/contact-us/',
  about: '/about/',
  terms: '/terms/',
  shippingPolicy: '/shipping-policy/',
  upSell: '/up-sell/',
  blogs: '/blogs/',
}

export const TOP_MENUS: NavItemProps[] = [
  {
    title: 'Passport Photo',
    link: PAGES.photo.index,
    items: [],
  },
  {
    title: 'FAQ',
    link: `${PAGES.home}#faq`,
    items: [],
  },
  {
    title: 'About',
    link: PAGES.about,
    items: [],
  },
  {
    title: 'Contact Us',
    link: PAGES.contactUs,
    items: [],
  },
]
