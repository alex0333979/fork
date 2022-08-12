import React, { useCallback } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

import { SignedUrl, useUpdateEntryPhotoMutation } from '@/apollo'
import { TCamera } from '@/types'
import { PAGES, COOKIES_EDIT_ORDER_TOKEN_NAME, TEMP_IMG_DIM } from '@/constants'
import GetPhoto from './_getPhoto'

const TakeNewPhoto: React.FC = () => {
  const router = useRouter()
  const [cookie, setCookie] = useCookies([
    COOKIES_EDIT_ORDER_TOKEN_NAME,
    TEMP_IMG_DIM,
  ])

  const [updateEntryPhoto] = useUpdateEntryPhotoMutation()

  const updateEntry = useCallback(
    async (
      signedUrl: SignedUrl,
      imgResolution: string,
      camera: TCamera,
      setLoading: (l: boolean) => void,
    ) => {
      const { data } = await updateEntryPhoto({
        variables: {
          imageUrl: signedUrl.url,
          editToken: cookie[COOKIES_EDIT_ORDER_TOKEN_NAME],
        },
        fetchPolicy: 'no-cache',
      })
      const result = data?.UpdateEntryPhoto.data

      setCookie(TEMP_IMG_DIM, imgResolution, {
        path: '/',
      })
      await router.push(
        `${PAGES.photo.editPhoto}?entryId=${result?.id || ''}&type=${camera}`,
      )
      setLoading(false)
    },
    [cookie, router, setCookie, updateEntryPhoto],
  )

  return <GetPhoto onSubmitEntry={updateEntry} />
}
export default TakeNewPhoto
