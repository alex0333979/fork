import { NavItemProps } from '@/components/layout/NavItem';

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
