import {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
  RefObject,
} from 'react'
import { FACING_MODES } from 'react-html5-camera-photo'
import axios from 'axios'

import { SignedUrl, useGetSignedUrlLazyQuery } from '@/apollo'
import { showSuccess, showError } from '@/utils'
import { TOnSubmitEntry } from '@/types'

interface IUseGetPhoto {
  fileRef: RefObject<HTMLInputElement>
  onSubmitEntry: TOnSubmitEntry
}

export const useGetPhoto = ({ fileRef, onSubmitEntry }: IUseGetPhoto) => {
  const [camera, setCamera] = useState<'user' | 'environment'>(
    FACING_MODES.USER,
  )
  const [imageResolution, setImageResolution] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)
  const [openCamera, setOpenCamera] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined,
  )
  const CancelToken = axios.CancelToken
  const cancel = useRef<any>(null)
  const [percentage, setPercentage] = useState<number>(0)

  const [getSignedUrl, { data: signedUrlResponse, loading: sLoading }] =
    useGetSignedUrlLazyQuery({
      fetchPolicy: 'no-cache',
      onError: () => {
        setLoading(false)
      },
    })

  const onSubmit = useCallback(async () => {
    if (loading || sLoading) {
      return
    }
    setLoading(true)
    getSignedUrl({})
  }, [loading, sLoading, getSignedUrl])

  const onUploadToS3 = useCallback(
    (data: SignedUrl) => {
      if (!selectedImage) {
        showError('Select Image first.')
        return
      }
      const config = {
        cancelToken: new CancelToken(function executor(c) {
          cancel.current = c
        }),
        onUploadProgress: (progressEvent: any) => {
          const { loaded, total } = progressEvent
          setPercentage(Math.round((loaded * 100) / total))
        },
      }
      setLoading(true)
      axios
        .put(data.signedUrl, selectedImage, config)
        .then(async () => {
          showSuccess('File upload success.')
          await onSubmitEntry(data, imageResolution, camera, (l: boolean) =>
            setLoading(l),
          )
        })
        .catch((err) => {
          setLoading(false)
          showError(err.message)
          if (fileRef?.current) {
            fileRef.current.value = ''
          }
        })
    },
    [
      selectedImage,
      CancelToken,
      onSubmitEntry,
      imageResolution,
      camera,
      fileRef,
    ],
  )

  const onCancelUpload = useCallback(() => {
    cancel.current('Upload cancelled')
  }, [])

  const onLoadImage = useCallback(
    async (file: File) => {
      const _URL = window.URL || window.webkitURL
      const img: HTMLImageElement = new Image()
      const objectUrl = _URL.createObjectURL(file)
      img.onload = function () {
        setImageResolution(`${img.width} x ${img.height}`)
        _URL.revokeObjectURL(objectUrl)
      }
      img.src = objectUrl
      await onSubmit()
    },
    [onSubmit],
  )

  const onPhotoTaken = useCallback(
    async (file: File) => {
      setSelectedImage(file)
      setOpenCamera(false)
      await onLoadImage(file)
    },
    [onLoadImage],
  )

  const onFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        console.log({ type: e.target.files[0].type })
        if (e.target.files[0].type.match('image/png')) {
          setSelectedImage(e.target.files[0])
          await onLoadImage(e.target.files[0])
        } else {
          showError('Unsupported file type')
        }
      }
    },
    [onLoadImage],
  )

  const inProgress = useMemo(() => loading || sLoading, [loading, sLoading])

  useEffect(() => {
    const data = signedUrlResponse?.GetSignedUrl.data
    if (data) {
      onUploadToS3(data)
    }
    return () => undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedUrlResponse])

  return {
    inProgress,
    percentage,
    selectedImage,
    camera,
    openCamera,
    onChangeCamera: (m: 'user' | 'environment') => setCamera(m),
    onOpenCamera: (opened: boolean) => setOpenCamera(opened),
    onFileChange,
    onPhotoTaken,
    onCancelUpload,
  }
}
