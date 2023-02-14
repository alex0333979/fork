export const PageTypeHashes = {
  landingPage: 'landing_page',
  contactUs: 'contact_us',
  process_page: 'process_page',
  checkout_page: 'checkout',
  article_page: 'article',
  about_page: 'about',
}

export const PageUIDHashes = {
  orderPage:
    'united-states-passport-order-your-passport-photos-online-with-our-simple-digital-tool',
  homepage: 'home',
  contactusPage: 'contact-us',
  processPage: 'take-photo',
  checkoutPage: 'checkout',
  articlePage: 'article',
  dynamic_page: 'country-dynamic-landing-page',
  document_page: 'document-dynamic-landing-page',
  aboutPage: 'about',
  dynamic_blog_page:
    'how-to-take-passport-photo-with-iphone-the-ideal-diy-guide--test',
}

export const prismicRoutes = [
  {
    type: PageTypeHashes.landingPage,
    uid: PageUIDHashes.homepage,
    path: '/',
  },
  {
    type: PageTypeHashes.landingPage,
    uid: PageUIDHashes.homepage,
    path: '/:uid',
  },
  {
    type: PageTypeHashes.landingPage,
    uid: PageUIDHashes.orderPage,
    path: '/',
  },
  {
    type: PageTypeHashes.landingPage,
    uid: PageUIDHashes.dynamic_page,
    path: '/:uid',
  },
  {
    type: PageTypeHashes.landingPage,
    uid: PageUIDHashes.document_page,
    path: '/:uid/:uid',
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
  {
    type: PageTypeHashes.checkout_page,
    uid: PageUIDHashes.checkoutPage,
    path: '/checkout',
  },
  {
    type: PageTypeHashes.article_page,
    uid: PageUIDHashes.articlePage,
    path: '/photo/take-photo/:uid',
  },
  {
    type: PageTypeHashes.about_page,
    uid: PageUIDHashes.aboutPage,
    path: '/about',
  },
  {
    type: PageTypeHashes.article_page,
    uid: PageUIDHashes.dynamic_blog_page,
    path: '/blogs/:uid',
  },
]
