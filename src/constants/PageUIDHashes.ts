export const PageTypeHashes = {
  usLandingPage: 'landing_page',
  contactUs: 'contact_us',
  process_page: 'process_page',
}

export const PageUIDHashes = {
  orderPage:
    'united-states-passport-order-your-passport-photos-online-with-our-simple-digital-tool',
  homepage: 'home',
  contactusPage: 'contact-us',
  processPage: 'take-photo',
}

export const prismicRoutes = [
  {
    type: PageTypeHashes.usLandingPage,
    uid: PageUIDHashes.homepage,
    path: '/',
  },
  {
    type: PageTypeHashes.usLandingPage,
    uid: PageUIDHashes.orderPage,
    path: '/',
  },
  {
    type: PageTypeHashes.contactUs,
    uid: PageUIDHashes.contactusPage,
    path: '/contact-us',
  },
  {
    type: PageTypeHashes.process_page,
    uid: PageUIDHashes.processPage,
    path: '/photo/take-photo/',
  },
]
