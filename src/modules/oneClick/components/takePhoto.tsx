import React, { useCallback, useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie'
import cloneDeep from 'lodash/cloneDeep'

import { showError, showSuccess } from '@/utils'
import { useGetPhoto } from '@/hooks'
import { SignedUrl, useSubmitEntryMutation, Form, Entry } from '@/apollo'
import { Maybe, TCamera } from '@/types'
import { TEMP_IMG_DIM, PHOTO_STEP } from '@/constants'

import ProcessStepPhoto from '@/modules/photo/components/processStepPhoto'
import PhotoHelper from '@/modules/photo/components/photoHelperVideoModal'
import ProcessingPhoto from '@/modules/photo/components/photoProcessing'
import UploadPhoto from '@/modules/photo/components/uploadPhoto'

interface Props {
  documentId: string
  form: Form
  entry: Maybe<Entry>
  camera: TCamera
  onEntrySubmitted: (eId: string, camera: TCamera) => void
}

const TakePhoto: React.FC<Props> = ({
  documentId,
  form,
  entry,
  camera: _camera,
  onEntrySubmitted,
}) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const [, setCookie] = useCookies([TEMP_IMG_DIM])

  const [submitEntry] = useSubmitEntryMutation()

  const onSubmitEntry = useCallback(
    async (
      signedUrl: SignedUrl,
      imgResolution: string,
      camera: TCamera,
      setLoading: (l: boolean) => void,
    ) => {
      const formStep = cloneDeep(form.steps[0])
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
        for (const field of formStep.fields) {
          if (field.name === key) {
            field.value = a[key]
            break
          }
        }
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
        onEntrySubmitted(result.id, camera)
        setLoading(false)
      }
    },
    [
      documentId,
      entry?.id,
      form.id,
      form.steps,
      onEntrySubmitted,
      setCookie,
      submitEntry,
    ],
  )

  const {
    inProgress,
    percentage,
    selectedImage,
    camera,
    onChangeCamera,
    onFileChange,
    onPhotoTaken,
    onCancelUpload,
  } = useGetPhoto({
    camera: _camera,
    fileRef,
    onSubmitEntry,
  })

  useEffect(() => {
    if (fileRef.current) {
      fileRef.current.value = ''
    }
  }, [])

  return (
    <div className="steps-content">
      <div className="step-data">
        <div className="data-wrap">
          <ProcessStepPhoto step={1} steps={PHOTO_STEP.steps} />
          <input
            type="file"
            hidden
            accept="image/png"
            ref={fileRef}
            onChange={onFileChange}
          />
          {inProgress ? (
            <ProcessingPhoto
              selectedImage={selectedImage}
              percentage={percentage}
              onCancelUpload={onCancelUpload}
            />
          ) : (
            <UploadPhoto
              camera={camera}
              onChangeCamera={onChangeCamera}
              onStartUpload={() => fileRef?.current?.click()}
              onPhotoTaken={onPhotoTaken}
            />
          )}
          <PhotoHelper />
        </div>
      </div>
    </div>
  )
}
export default TakePhoto
