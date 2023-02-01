export const PageTypeHashes = {
  usLandingPage: 'landing_page',
}

export const PageUIDHashes = {
  orderPage:
    'united-states-passport-order-your-passport-photos-online-with-our-simple-digital-tool',
  homepage: 'home',
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
]
