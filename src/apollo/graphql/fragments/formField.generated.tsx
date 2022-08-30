import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { OptionFragmentDoc } from './option.generated';
import { ValidationFragmentDoc } from './validation.generated';
export type FormFieldFragment = { __typename?: 'FormField', index?: number | null, name: string, type: Types.FieldType, text?: string | null, required?: boolean | null, value?: any | null, defaultValue?: any | null, disabled?: boolean | null, hidden?: boolean | null, notes?: string | null, placeholder?: string | null, options?: Array<{ __typename?: 'Option', notes?: string | null, text?: string | null, value: any }> | null, validations?: Array<{ __typename?: 'Validation', message?: string | null, type: Types.ValidationType, value?: number | null }> | null };

export const FormFieldFragmentDoc = gql`
    fragment FormField on FormField {
  index
  name
  type
  text
  required
  value
  defaultValue
  disabled
  hidden
  notes
  placeholder
  options {
    ...Option
  }
  validations {
    ...Validation
  }
}
    ${OptionFragmentDoc}
${ValidationFragmentDoc}`;