import { IMAGE_TYPES } from 'react-html5-camera-photo'

const dataURItoBlob = (dataURI: string) => {
  const byteString = atob(dataURI.split(',')[1])

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: mimeString })
}

export const getFileExtension = (blobType: string) => {
  // by default the extension is .png
  let extension: string = IMAGE_TYPES.PNG

  if (blobType === 'image/jpeg') {
    extension = IMAGE_TYPES.JPG
  }
  return extension
}

export const getFileName = (blobType: string) => {
  const prefix = 'photo'
  const extension = getFileExtension(blobType)
  return `${prefix}-${new Date().getTime()}.${extension}`
}

export const downloadImageFileFomBlob = (blob: Blob) => {
  window.URL = window.webkitURL || window.URL

  const anchor = document.createElement('a')
  anchor.download = getFileName(blob.type)
  anchor.href = window.URL.createObjectURL(blob)
  document.body.appendChild(anchor)
  anchor.click()
  anchor.parentNode?.removeChild(anchor)
}

export const createFileFromBase64 = (dataUri: string): File => {
  const blob = dataURItoBlob(dataUri)
  return new File([blob], getFileName(blob.type))
}
