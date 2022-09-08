import { FormStep } from '@/apollo'

import { IEntry } from '@/modules/application/applicationForm/types'

export const cleanEntry = (entry: IEntry): IEntry => {
  const steps: FormStep[] = []

  entry?.form?.steps?.forEach((step) => {
    const fields = step.fields.map((field) => ({
      ...field,
      defaultValue: field.defaultValue ?? undefined,
      value: field.value ?? undefined,
    }))

    steps.push({ ...step, fields })
  })

  return { ...(entry || {}), form: { ...entry.form, steps } }
}
