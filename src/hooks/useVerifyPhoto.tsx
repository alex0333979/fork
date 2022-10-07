import { useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import { parse } from 'path'

import {
  Code,
  Dictionary,
  Entry,
  useCheckPhotoMutation,
  PDocument,
} from '@/apollo'
import { ProcessingStatus } from '@/types'
import { showError } from '@/utils'
import { TEMP_IMG_DIM } from '@/constants'

interface IUseVerifyPhoto {
  entry?: Entry
  document?: PDocument
  photoUrl?: string
}

export const useVerifyPhoto = ({
  entry,
  document,
  photoUrl,
}: IUseVerifyPhoto) => {
  const [cookie, , removeCookie] = useCookies([TEMP_IMG_DIM])
  const [status, setStatus] = useState<ProcessingStatus>(
    ProcessingStatus.notStarted,
  )
  const [failed, setFailed] = useState<Dictionary[]>([])
  const [passed, setPassed] = useState<Dictionary[]>([])

  const [checkPhoto] = useCheckPhotoMutation({
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      const result = data?.CheckPhoto.data
      if (result) {
        removeCookie(TEMP_IMG_DIM)
        if (result.code === Code.Code200) {
          setStatus(ProcessingStatus.success)
        } else {
          setStatus(ProcessingStatus.failed)
        }
        setFailed(result.failed ?? [])
        setPassed(result.passed ?? [])
      } else {
        showError(data?.CheckPhoto.message ?? 'Unexpected error')
        setStatus(ProcessingStatus.failed)
      }
    },
  })

  useEffect(
    () => () => {
      setStatus(ProcessingStatus.notStarted)
    },
    [],
  )

  useEffect(() => {
    if (!entry?.id) return
    if (status !== ProcessingStatus.notStarted) return

    setStatus(ProcessingStatus.loading)
    const userAgent = navigator.userAgent
    checkPhoto({
      variables: {
        entryId: entry.id,
        userAgent,
        imageResolution: cookie[TEMP_IMG_DIM] || 'x',
      },
      fetchPolicy: 'no-cache',
    })
  }, [checkPhoto, cookie, entry?.id, status])

  const imageUrl = useMemo(
    () =>
      entry?.form.steps[0].fields.find((f) => f.name === 'image_url')?.value ||
      photoUrl,
    [entry?.form.steps, photoUrl],
  )

  const imageLink = useMemo<string>(() => {
    if (imageUrl) {
      return status === ProcessingStatus.success
        ? `${parse(imageUrl).dir}/${parse(imageUrl).name}_watermark${
            parse(imageUrl).ext
          }`
        : imageUrl
    } else {
      return '/images/steps/step-02-03.png'
    }
  }, [imageUrl, status])

  const { width, height } = useMemo(() => {
    if (
      document?.dimensions?.width &&
      document?.dimensions?.height &&
      document?.dimensions?.unit
    ) {
      return {
        width: `${document?.dimensions?.width}${document?.dimensions?.unit}`,
        height: `${document?.dimensions?.height}${document?.dimensions?.unit}`,
      }
    }

    return { width: 'unset', height: 'unset' }
  }, [
    document?.dimensions?.height,
    document?.dimensions?.unit,
    document?.dimensions?.width,
  ])

  return {
    status,
    imageUrl,
    imageLink,
    width,
    height,
    passed,
    failed,
  }
}
