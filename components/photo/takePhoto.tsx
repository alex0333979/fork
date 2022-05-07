/* eslint-disable max-len */
import React, { useCallback } from 'react'
import { useRouter } from 'next/router'

import { showError, showSuccess } from '@/lib/utils/toast'
import { TakePhotoPageProps } from '@/pages/photo/take-photo'
import { SignedUrl, useSubmitEntryMutation } from '@/generated/graphql'
import { PAGES } from '../../constants'
import GetPhoto from './_getPhoto'

const TakePhoto: React.FC<TakePhotoPageProps> = ({
  form,
  entry,
  documentId,
}) => {
  const router = useRouter()

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
        const index = formStep.fields.findIndex((field) => field.name === key)
        if (index === -1) {
          showError(`Create Entry Error, ${key} field not found.`)
          return
        }
        formStep.fields[index].value = a[key]
      })
      setLoading(true)
      const { data } = await submitEntry({
        variables: { entryId: entry?.id, formId: form.id, formStep },
        fetchPolicy: 'no-cache',
      })
      setLoading(false)
      const result = data?.SubmitEntry.data
      if (result) {
        if (entry?.id) {
          showSuccess('Entry image is updated.')
        } else {
          showSuccess('Entry is created.')
        }
        await router.push(
          `${PAGES.photo.processPhoto}?entryId=${result.id}&type=${type}&documentId=${documentId}&imgRes=${imgResolution}`,
        )
      }
    },
    [documentId, entry?.id, form.id, form.steps, router, submitEntry],
  )

  return <GetPhoto onSubmitEntry={createEntry} />
}
export default TakePhoto
