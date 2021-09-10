import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/auth';

const CreateEntry: NextPage = () => {
  const router = useRouter();
  const { createGuest, getSavedEntries } = useAuth();

  useEffect(() => {
    createGuest();
    const savedEntries = getSavedEntries();
    console.log('===savedEntries===:', savedEntries);
    if (savedEntries.length > 0) {

    }
  }, []);

  return (
    <>
      <Head>
        <title>Biometric Photos</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
    </>
  );
};

export default CreateEntry;
