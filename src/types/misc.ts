import { SignedUrl } from '@/apollo'

export interface ILanguage {
  label: string
  value: string
}

export interface ValidationError {
  [key: string]: string
}

export type TOnSubmitEntry = (
  signedUrl: SignedUrl,
  imgResolution: string,
  type: string,
  setLoading: (l: boolean) => void,
) => void
