import { NavItemProps } from '@/components/layout/navItem';
import { ProcessStepProps } from '@/components/elements/processStep';

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
      step: 1
    },
    {
      name: 'Shipping Information',
      step: 2
    },
    {
      name: 'Payment Information',
      step: 3
    },
    {
      name: 'Review and Pay',
      step: 4
    }
  ]
};

export const SHIPPING_PRICE = 950;
