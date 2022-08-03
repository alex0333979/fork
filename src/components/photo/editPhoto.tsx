import React, { useCallback, useState } from 'react'
import { useRouter, NextRouter } from 'next/router'
import { FACING_MODES } from 'react-html5-camera-photo'
import { useCookies } from 'react-cookie'

import { PAGES } from '@/constants'
import { EditPhotoProps } from '@/pages/photo/edit-photo'
import { useUpdateOrderPhotoMutation } from '@/apollo'
import { COOKIES_EDIT_ORDER_TOKEN_NAME } from '@/constants'
import { showError, showSuccess } from '@/utils'
import SaveButton from './components/saveButton'
import VerifyEmail from './components/verifyEmail'
import VerifyPhoto from './_verifyPhoto'
import { ProcessingStatus } from './types'

const EditPhoto: React.FC<EditPhotoProps> = ({ accessToken, entry, type }) => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string | undefined>()

  const [cookie, , removeCookie] = useCookies([COOKIES_EDIT_ORDER_TOKEN_NAME])
  const [updateOrderPhoto] = useUpdateOrderPhotoMutation()

  const onSave = useCallback(
    async (status: ProcessingStatus, imageLink: string) => {
      if (status !== ProcessingStatus.success) return
      setLoading(true)
      const { data } = await updateOrderPhoto({
        variables: {
          editToken: cookie[COOKIES_EDIT_ORDER_TOKEN_NAME],
          imageUrl: imageLink,
        },
      })

      const result = data?.UpdateOrderPhoto
      if (result?.status) {
        showSuccess(result.message)
        removeCookie(COOKIES_EDIT_ORDER_TOKEN_NAME)
        router.push(PAGES.home)
      } else {
        showError('Something went wrong. Please try again later.')
      }
      setLoading(false)
    },
    [cookie, removeCookie, router, updateOrderPhoto],
  )

  const onVerifyEmail = useCallback((imgUrl?: string) => {
    setImageUrl(imgUrl)
  }, [])

  const onChangePhoto = useCallback(() => {
    router.push(PAGES.photo.takeNewPhoto)
  }, [router])

  return (
    <>
      <VerifyPhoto
        entry={entry}
        type={type || FACING_MODES.USER}
        photoUrl={imageUrl}
        onChangePhoto={onChangePhoto}
        renderTitle={(s: ProcessingStatus) => {
          if (s === ProcessingStatus.notStarted) {
            return 'Edit your photo and save it'
          }
          if (s === ProcessingStatus.loading) {
            return 'Processing...'
          }
          if (s === ProcessingStatus.failed) {
            return (
              <>
                <span className="failed">{'Not approved'}</span>
                {' - See Requirements Below and Retake Photo'}
              </>
            )
          }

          return (
            <>
              <span className="success">{'Success'}</span>
              {' - Proceed To Checkout'}
            </>
          )
        }}
        renderRetakeButton={(
          status: ProcessingStatus,
          router: NextRouter,
          onOpenInfo: (v: boolean) => void,
          imageLink: string,
        ) => (
          <SaveButton
            loading={loading}
            status={status}
            onSave={() => onSave(status, imageLink)}
            onOpenInfo={onOpenInfo}
          />
        )}
      />
      <VerifyEmail accessToken={accessToken || ''} onVerified={onVerifyEmail} />
    </>
  )
}
export default EditPhoto
