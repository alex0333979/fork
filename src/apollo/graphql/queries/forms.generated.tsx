import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { FormFragmentDoc } from '../fragments/form.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FormsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FormsQuery = { __typename?: 'Query', Forms: Array<{ __typename?: 'Form', id: string, name: string, description: string, steps: Array<{ __typename?: 'FormStep', name: string, step: number, notes?: string | null, fields: Array<{ __typename?: 'FormField', index?: number | null, name: string, type: Types.FieldType, text?: string | null, required?: boolean | null, value?: any | null, defaultValue?: any | null, disabled?: boolean | null, hidden?: boolean | null, notes?: string | null, placeholder?: string | null, options?: Array<{ __typename?: 'Option', notes?: string | null, text?: string | null, value: any }> | null, validations?: Array<{ __typename?: 'Validation', message?: string | null, type: Types.ValidationType, value?: number | null }> | null }> }> }> };


export const FormsDocument = gql`
    query Forms {
  Forms {
    ...Form
  }
}
    ${FormFragmentDoc}`;

/**
 * __useFormsQuery__
 *
 * To run a query within a React component, call `useFormsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFormsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFormsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFormsQuery(baseOptions?: Apollo.QueryHookOptions<FormsQuery, FormsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FormsQuery, FormsQueryVariables>(FormsDocument, options);
      }
export function useFormsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FormsQuery, FormsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FormsQuery, FormsQueryVariables>(FormsDocument, options);
        }
export type FormsQueryHookResult = ReturnType<typeof useFormsQuery>;
export type FormsLazyQueryHookResult = ReturnType<typeof useFormsLazyQuery>;
export type FormsQueryResult = Apollo.QueryResult<FormsQuery, FormsQueryVariables>;