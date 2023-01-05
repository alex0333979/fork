import ExtraPath from "@/pages/[country]/[documentType]/[extraPath]"

export const PRIVATE_ROUTES = ['/photo/edit-photo']

export const ExtraPathMap = {
  OrderPassportPhotosOnline: 'order-passport-photos-online',
  TakeYourOwnPassportPhoto: 'take-your-own-passport-photo',
  TakeYourPassportPhotoWithYourPhone:
    'take-your-passport-photo-with-your-phone',
  TakePassportPhotosAtHome: 'take-passport-photos-at-home',
  PrintPassportPhotosAtHome: 'print-passport-photos-at-home',
  PassportPhotoApp: 'passport-photo-app',
  PrintMyPassportPhotoAtCvs: 'print-my-passport-photo-at-cvs',
  PrintMyPassportPhotoAtWalgreens: 'print-my-passport-photo-at-walgreens',
  PassportPhotosNearMe: 'passport-photos-near-me',
  CanadianPassportAtHome: 'canadian-passport-at-home',
  CanadianPassportPhoto: 'canadian-passport-photo'
}

export const AvailablePath: {
  [country: string]: { [docType: string]: string[] }
} = {
  'united-states': {
    passport: [
      ExtraPathMap.OrderPassportPhotosOnline,
      ExtraPathMap.TakeYourOwnPassportPhoto,
      ExtraPathMap.TakeYourPassportPhotoWithYourPhone,
      ExtraPathMap.TakePassportPhotosAtHome,
      ExtraPathMap.PrintPassportPhotosAtHome,
      ExtraPathMap.PassportPhotoApp,
      ExtraPathMap.PrintMyPassportPhotoAtCvs,
      ExtraPathMap.PrintMyPassportPhotoAtWalgreens,
      ExtraPathMap.PassportPhotosNearMe,
    ],
  },
  'united-kingdom': {
    passport: [
      ExtraPathMap.TakePassportPhotosAtHome,
      ExtraPathMap.OrderPassportPhotosOnline,
      ExtraPathMap.TakeYourOwnPassportPhoto,
      ExtraPathMap.TakeYourPassportPhotoWithYourPhone,
      ExtraPathMap.PrintPassportPhotosAtHome,
      ExtraPathMap.PassportPhotoApp,
    ],
  },
  'canada': {
    passport: [
      ExtraPathMap.CanadianPassportAtHome,
      ExtraPathMap.CanadianPassportPhoto
    ]
  }
}
