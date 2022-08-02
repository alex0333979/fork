import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { FormFragmentDoc } from '../fragments/form.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FormQueryVariables = Types.Exact<{
  formId: Types.Scalars['String'];
}>;


export type FormQuery = { __typename?: 'Query', Form: { __typename?: 'FormResponse', message: string, status: boolean, data?: { __typename?: 'Form', id: string, name: string, description: string, steps: Array<{ __typename?: 'FormStep', name: string, step: number, notes?: string | null, fields: Array<{ __typename?: 'FormField', index?: number | null, name: string, type: Types.FieldType, text?: string | null, required?: boolean | null, value?: any | null, defaultValue?: any | null, disabled?: boolean | null, hidden?: boolean | null, notes?: string | null, placeholder?: string | null, options?: Array<{ __typename?: 'Option', notes?: string | null, text?: string | null, value: any }> | null, validations?: Array<{ __typename?: 'Validation', message?: string | null, type: Types.ValidationType, value?: number | null }> | null }> }> } | null } };


export const FormDocument = gql`
    query Form($formId: String!) {
  Form(id: $formId) {
    message
    status
    data {
      ...Form
    }
  }
}
    ${FormFragmentDoc}`;

/**
 * __useFormQuery__
 *
 * To run a query within a React component, call `useFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFormQuery({
 *   variables: {
 *      formId: // value for 'formId'
 *   },
 * });
 */
export function useFormQuery(baseOptions: Apollo.QueryHookOptions<FormQuery, FormQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FormQuery, FormQueryVariables>(FormDocument, options);
      }
export function useFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FormQuery, FormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FormQuery, FormQueryVariables>(FormDocument, options);
        }
export type FormQueryHookResult = ReturnType<typeof useFormQuery>;
export type FormLazyQueryHookResult = ReturnType<typeof useFormLazyQuery>;
export type FormQueryResult = Apollo.QueryResult<FormQuery, FormQueryVariables>;