import React, { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

import { SignedUrl, useUpdateEntryPhotoMutation } from '@/generated/graphql';
import { COOKIES_EDIT_ORDER_TOKEN_NAME } from '@/lib/apolloClient';
import { PAGES } from '../../constants';
import GetPhoto from './_getPhoto';

const TakeNewPhoto: React.FC = () => {
  const router = useRouter();
  const [cookie] = useCookies([COOKIES_EDIT_ORDER_TOKEN_NAME]);

  const [updateEntryPhoto] = useUpdateEntryPhotoMutation();

  const updateEntry = useCallback(
    async (
      signedUrl: SignedUrl,
      imgResolution: string,
      type: string,
      setLoading: (l: boolean) => void
    ) => {
      setLoading(true);
      const { data } = await updateEntryPhoto({
        variables: { imageUrl: signedUrl.url, editToken: cookie[COOKIES_EDIT_ORDER_TOKEN_NAME] },
        fetchPolicy: 'no-cache'
      });
      setLoading(false);
      const result = data?.UpdateEntryPhoto.data;

      await router.push(
        `${PAGES.photo.editPhoto}?entryId=${result?.id || ''}&type=${type}&imgRes=${imgResolution}`
      );
    },
    [cookie, router, updateEntryPhoto]
  );

  return <GetPhoto onSubmitEntry={updateEntry} />;
};
export default TakeNewPhoto;
