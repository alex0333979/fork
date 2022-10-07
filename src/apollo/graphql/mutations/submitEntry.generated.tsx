import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { FormFragmentDoc } from '../fragments/form.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SubmitEntryMutationVariables = Types.Exact<{
  entryId?: Types.InputMaybe<Types.Scalars['ID']>;
  formId: Types.Scalars['ID'];
  formStep: Types.FormStepInput;
}>;


export type SubmitEntryMutation = { __typename?: 'Mutation', SubmitEntry: { __typename?: 'EntryResponse', message: string, status: boolean, data?: { __typename?: 'Entry', id: string, userId: string, currentStep: number, isComplete: boolean, formId: string, createdAt: any, updatedAt: any, form: { __typename?: 'Form', id: string, name: string, description: string, steps: Array<{ __typename?: 'FormStep', name: string, step: number, notes?: string | null, fields: Array<{ __typename?: 'FormField', index?: number | null, name: string, type: Types.FieldType, text?: string | null, required?: boolean | null, value?: any | null, defaultValue?: any | null, disabled?: boolean | null, hidden?: boolean | null, notes?: string | null, placeholder?: string | null, options?: Array<{ __typename?: 'Option', notes?: string | null, text?: string | null, value: any }> | null, validations?: Array<{ __typename?: 'Validation', message?: string | null, type: Types.ValidationType, value?: number | null }> | null }> }> } } | null } };


export const SubmitEntryDocument = gql`
    mutation SubmitEntry($entryId: ID, $formId: ID!, $formStep: FormStepInput!) {
  SubmitEntry(entryId: $entryId, formId: $formId, formStep: $formStep) {
    message
    status
    data {
      id
      userId
      currentStep
      isComplete
      formId
      form {
        ...Form
      }
      createdAt
      updatedAt
    }
  }
}
    ${FormFragmentDoc}`;
export type SubmitEntryMutationFn = Apollo.MutationFunction<SubmitEntryMutation, SubmitEntryMutationVariables>;

/**
 * __useSubmitEntryMutation__
 *
 * To run a mutation, you first call `useSubmitEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitEntryMutation, { data, loading, error }] = useSubmitEntryMutation({
 *   variables: {
 *      entryId: // value for 'entryId'
 *      formId: // value for 'formId'
 *      formStep: // value for 'formStep'
 *   },
 * });
 */
export function useSubmitEntryMutation(baseOptions?: Apollo.MutationHookOptions<SubmitEntryMutation, SubmitEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitEntryMutation, SubmitEntryMutationVariables>(SubmitEntryDocument, options);
      }
export type SubmitEntryMutationHookResult = ReturnType<typeof useSubmitEntryMutation>;
export type SubmitEntryMutationResult = Apollo.MutationResult<SubmitEntryMutation>;
export type SubmitEntryMutationOptions = Apollo.BaseMutationOptions<SubmitEntryMutation, SubmitEntryMutationVariables>;