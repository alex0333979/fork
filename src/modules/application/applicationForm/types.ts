import { Form, FormField } from '@/apollo'

export interface IEntry {
  id: string | null
  currentStep: number
  completeStep: number
  form: Form
  formId: string
}

export interface FormProps {
  forms: Form[]
  entry: IEntry
  step: number
}

export interface FormStep1Props {
  forms: Form[]
  entry: IEntry
}

export interface FormElementProps {
  field: FormField
  country: string
  error: string | undefined
  onValueChange: (
    name: string,
    value: string | number | boolean | undefined,
  ) => void
  onSelectCountry: (name: string, value: string) => void
}
