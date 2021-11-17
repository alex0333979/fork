import { NavItemProps } from '@/components/layout/navItem';
import { ProcessStepProps } from '@/components/elements/processStep';
import { FieldType, FormField, ShippingType, ValidationType } from '@/generated/graphql';

export const PAGES = {
  home: '/',
  application: {
    index: '/application/',
    create: '/application/create/'
  },
  checkout: {
    index: '/checkout/',
    deliveryMethod: '/checkout/',
    shipping: '/checkout/shipping/',
    payment: '/checkout/payment/',
    review: '/checkout/review/'
  },
  cart: '/cart/',
  photo: {
    index: '/photo/',
    selectType: '/photo/select-type/',
    uploadPhoto: '/photo/upload-photo/',
    processPhoto: '/photo/process-photo/'
  },
  contactUs: '/contact-us',
  about: '/about'
};

export const US_DOCUMENT_ID = 484;

export const TOP_MENUS: NavItemProps[] = [
  // {
  //   title: 'How it works',
  //   items: [
  //     {
  //       title: 'Passport photo',
  //       link: '/application/create'
  //     }
  //   ]
  // },
  // {
  //   title: 'Pricing',
  //   link: '/',
  //   items: []
  // },
  {
    title: 'Passport Photo',
    link: PAGES.photo.index,
    items: []
  },
  {
    title: 'Passport Application',
    link: PAGES.application.create,
    items: []
  },
  {
    title: 'FAQ',
    link: `${PAGES.home}#faq`,
    items: []
  },
  {
    title: 'About',
    link: PAGES.about,
    items: []
  },
  {
    title: 'Contact Us',
    link: PAGES.contactUs,
    items: []
  }
];

export const PHOTO_FORM = 'Photo';

export const CHECKOUT_STEPS: ProcessStepProps = {
  title: 'New passport application',
  completeStep: 0,
  step: 1,
  steps: [
    {
      name: 'Delivery Method',
      step: 1,
      link: PAGES.checkout.index
    },
    {
      name: 'Shipping Information',
      step: 2,
      link: PAGES.checkout.shipping
    },
    {
      name: 'Payment Information',
      step: 3,
      link: PAGES.checkout.payment
    },
    {
      name: 'Review and Pay',
      step: 4,
      link: PAGES.checkout.review
    }
  ]
};

export const PHOTO_STEP = {
  step: 1,
  steps: [
    {
      name: 'Select Type',
      step: 1,
      link: PAGES.photo.selectType
    },
    {
      name: 'Take Photo',
      step: 2,
      link: PAGES.photo.uploadPhoto
    },
    {
      name: 'Biometric Verification',
      step: 3,
      link: PAGES.photo.processPhoto
    }
  ]
};

export const CONCIERGE_PRICE = 947;

export const SHIPPING_TYPES: { title: string; price: number; value: ShippingType }[] = [
  {
    title: 'Expedited 3-6 day transit time',
    price: 1495,
    value: ShippingType.From3To6
  },
  {
    title: 'Three business days',
    price: 1995,
    value: ShippingType.From3To3
  },
  {
    title: 'Expedited 1-2 business days',
    price: 2995,
    value: ShippingType.From1To2
  },
  {
    title: 'Free standard shipping',
    price: 0,
    value: ShippingType.Free
  },
  {
    title: `No, I'm sure I don't want the concierge service and I will print my photos on my own.`,
    price: 0,
    value: ShippingType.NoShipping
  }
];

export const SHIPPING_BILLING_FORM: { [key: string]: FormField } = {
  firstName: {
    index: 0,
    type: FieldType.Input,
    name: 'firstName',
    text: 'First Name',
    required: true,
    placeholder: 'Input First name'
  },
  lastName: {
    index: 1,
    type: FieldType.Input,
    name: 'lastName',
    text: 'Last Name',
    required: true,
    placeholder: 'Input Last name'
  },
  address1: {
    index: 2,
    type: FieldType.Input,
    name: 'address1',
    text: 'Address 1',
    required: true,
    placeholder: 'Input address1'
  },
  address2: {
    index: 3,
    type: FieldType.Input,
    name: 'address2',
    text: 'Address 2',
    required: false,
    placeholder: 'Input address2'
  },
  city: {
    index: 4,
    type: FieldType.Input,
    name: 'city',
    text: 'City',
    required: true,
    placeholder: 'Input City'
  },
  postalCode: {
    index: 5,
    type: FieldType.Input,
    name: 'postalCode',
    text: 'Postal Code',
    required: true,
    placeholder: 'Input Zip Code',
    validations: [
      {
        type: ValidationType.IsNumber,
        message: 'Use correct US Zio code format'
      },
      {
        type: ValidationType.MaxLength,
        message: 'Use correct US Zio code format',
        value: 5
      },
      {
        type: ValidationType.MinLength,
        message: 'Use correct US Zio code format',
        value: 5
      }
    ]
  },
  state: {
    index: 6,
    type: FieldType.StatePicker,
    name: 'state',
    text: 'State',
    required: true,
    placeholder: 'Please Select'
  },
  country: {
    index: 7,
    type: FieldType.CountryPicker,
    name: 'country',
    text: 'Country',
    required: true,
    placeholder: 'Select Country',
    defaultValue: 'US'
  },
  email: {
    index: 8,
    type: FieldType.Input,
    name: 'email',
    text: 'Email',
    required: true,
    placeholder: 'Input Email',
    notes: 'Please enter your valid email address in the format - yourname@domainname.com',
    validations: [
      {
        type: ValidationType.IsEmail
      }
    ]
  },
  phone: {
    index: 9,
    type: FieldType.PhoneInput,
    name: 'phone',
    text: 'Phone Number',
    required: true,
    placeholder: 'Input Phone number',
    notes: '',
    validations: [
      {
        type: ValidationType.IsPhone,
        message: 'Input correct (US) phone Number format'
      }
    ]
  }
};
