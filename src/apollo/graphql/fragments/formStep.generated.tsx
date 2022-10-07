import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { FormFieldFragmentDoc } from './formField.generated';
export type FormStepFragment = { __typename?: 'FormStep', name: string, step: number, notes?: string | null, fields: Array<{ __typename?: 'FormField', index?: number | null, name: string, type: Types.FieldType, text?: string | null, required?: boolean | null, value?: any | null, defaultValue?: any | null, disabled?: boolean | null, hidden?: boolean | null, notes?: string | null, placeholder?: string | null, options?: Array<{ __typename?: 'Option', notes?: string | null, text?: string | null, value: any }> | null, validations?: Array<{ __typename?: 'Validation', message?: string | null, type: Types.ValidationType, value?: number | null }> | null }> };

export const FormStepFragmentDoc = gql`
    fragment FormStep on FormStep {
  name
  step
  notes
  fields {
    ...FormField
  }
}
    ${FormFieldFragmentDoc}`;