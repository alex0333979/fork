import { NextPage } from 'next';
import { AppLayout } from '@/components/index';
import React from 'react';
import ContactUs from '@/components/contactUs';

const ContactUsPage: NextPage = () => (
  <AppLayout>
    <ContactUs />
  </AppLayout>
);

export default ContactUsPage;
