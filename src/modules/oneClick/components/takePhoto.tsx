/* eslint-disable max-len */
import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

import { showError, showSuccess } from '@/utils'
import { TakePhotoPageProps } from '@/pages/photo/take-photo'
import { SignedUrl, useSubmitEntryMutation } from '@/apollo'
import { TEMP_IMG_DIM, PAGES } from '@/constants'
import GetPhoto from '../photo/_getPhoto'
import PhotoProcessing from './photoProcessing'

const TakePhoto: React.FC<TakePhotoPageProps> = ({
  form,
  entry,
  documentId,
}) => {
  const router = useRouter()
  const [, setCookie] = useCookies([TEMP_IMG_DIM])

  const [submitEntry] = useSubmitEntryMutation()

  const createEntry = useCallback(
    async (
      signedUrl: SignedUrl,
      imgResolution: string,
      type: string,
      setLoading: (l: boolean) => void,
    ) => {
      const formStep = form.steps[0]
      if (!formStep) {
        showError('Create Entry Error, formStep not found.')
        return
      }
      const a: any = {
        image_url: signedUrl.url,
        document_id: documentId,
        number_of_copies: 4,
      }
      Object.keys(a).map((key) => {
        const index = formStep.fields.findIndex(
          (field: any) => field.name === key,
        )
        if (index === -1) {
          showError(`Create Entry Error, ${key} field not found.`)
          return
        }
        formStep.fields[index].value = a[key]
      })
      const { data } = await submitEntry({
        variables: { entryId: entry?.id, formId: form.id, formStep },
        fetchPolicy: 'no-cache',
      })
      const result = data?.SubmitEntry.data
      if (result) {
        if (entry?.id) {
          showSuccess('Entry image is updated.')
        } else {
          showSuccess('Entry is created.')
        }
        setCookie(TEMP_IMG_DIM, imgResolution, {
          path: '/',
        })
        await router.push(
          `${PAGES.photo.processPhoto}?entryId=${result.id}&type=${type}&documentId=${documentId}`,
        )
        setLoading(false)
      }
    },
    [
      documentId,
      entry?.id,
      form.id,
      form.steps,
      router,
      setCookie,
      submitEntry,
    ],
  )

  return <GetPhoto onSubmitEntry={createEntry} />
}
export default TakePhoto
