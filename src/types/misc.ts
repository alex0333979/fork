import { SignedUrl } from '@/apollo'

export interface ILanguage {
  label: string
  value: string
}

export interface ValidationError {
  [key: string]: string
}

export type TCamera = 'user' | 'environment'

export type TOnSubmitEntry = (
  signedUrl: SignedUrl,
  imgResolution: string,
  camera: TCamera,
  setLoading: (l: boolean) => void,
) => void
