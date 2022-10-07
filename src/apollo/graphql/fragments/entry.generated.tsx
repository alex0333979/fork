import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { FormFragmentDoc } from './form.generated';
export type EntryFragment = { __typename?: 'Entry', id: string, userId: string, currentStep: number, completeStep: number, isComplete: boolean, formId: string, createdAt: any, updatedAt: any, form: { __typename?: 'Form', id: string, name: string, description: string, steps: Array<{ __typename?: 'FormStep', name: string, step: number, notes?: string | null, fields: Array<{ __typename?: 'FormField', index?: number | null, name: string, type: Types.FieldType, text?: string | null, required?: boolean | null, value?: any | null, defaultValue?: any | null, disabled?: boolean | null, hidden?: boolean | null, notes?: string | null, placeholder?: string | null, options?: Array<{ __typename?: 'Option', notes?: string | null, text?: string | null, value: any }> | null, validations?: Array<{ __typename?: 'Validation', message?: string | null, type: Types.ValidationType, value?: number | null }> | null }> }> } };

export const EntryFragmentDoc = gql`
    fragment Entry on Entry {
  id
  userId
  currentStep
  completeStep
  isComplete
  formId
  form {
    ...Form
  }
  createdAt
  updatedAt
}
    ${FormFragmentDoc}`;