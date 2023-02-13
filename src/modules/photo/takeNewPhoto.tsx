import React, { useCallback } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { PrismicDocument } from '@prismicio/types'

import { SignedUrl, useUpdateEntryPhotoMutation } from '@/apollo'
import { TCamera } from '@/types'
import { PAGES, COOKIES_EDIT_ORDER_TOKEN_NAME, TEMP_IMG_DIM } from '@/constants'
import GetPhoto from './_getPhoto'

export interface TakeNewPhotoProps {
  page?: PrismicDocument<Record<string, any>, string, string>
}

export interface ArticlePageProps {
  articlePage?: PrismicDocument<Record<string, any>, string, string>
}

const TakeNewPhoto: React.FC<TakeNewPhotoProps> = ({ page }) => {
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

  return <GetPhoto onSubmitEntry={updateEntry} page={page} />
}
export default TakeNewPhoto
