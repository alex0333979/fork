import { NavItemProps } from '@/components/layout/navItem';
import { ProcessStepProps } from '@/components/elements/processStep';
import { FieldType, FormField, ShippingType, ValidationType } from '@/generated/graphql';

export const TOP_MENUS: NavItemProps[] = [
  {
    title: 'How it works',
    items: [
      {
        title: 'Passport photo',
        link: '/application/create'
      }
    ]
  },
  {
    title: 'Pricing',
    link: '/',
    items: []
  },
  {
    title: 'What we offer',
    items: [
      {
        title: 'FAQ',
        link: '/'
      },
      {
        title: 'Blog',
        link: '/'
      },
      {
        title: 'Videos',
        link: '/'
      }
    ]
  },
  {
    title: 'Resources',
    items: [
      {
        title: 'FAQ',
        link: '/'
      },
      {
        title: 'Blog',
        link: '/'
      },
      {
        title: 'Videos',
        link: '/'
      }
    ]
  },
  {
    title: 'About',
    link: '/',
    items: []
  },
  {
    title: 'Contact Us',
    link: '/',
    items: []
  }
];

export const CHECKOUT_STEPS: ProcessStepProps = {
  title: 'New passport application',
  step: 1,
  steps: [
    {
      name: 'Delivery Method',
      step: 1,
      link: `/checkout`
    },
    {
      name: 'Shipping Information',
      step: 2,
      link: `/checkout/shipping`
    },
    {
      name: 'Payment Information',
      step: 3,
      link: `/checkout/payment`
    },
    {
      name: 'Review and Pay',
      step: 4,
      link: `/checkout/review`
    }
  ]
};

export const CONCIERGE_PRICE = 950;

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
    required: true,
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
