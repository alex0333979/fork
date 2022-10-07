import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { EntryFragmentDoc } from '../fragments/entry.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EntryQueryVariables = Types.Exact<{
  entryId: Types.Scalars['String'];
}>;


export type EntryQuery = { __typename?: 'Query', Entry: { __typename?: 'EntryResponse', message: string, status: boolean, data?: { __typename?: 'Entry', id: string, userId: string, currentStep: number, completeStep: number, isComplete: boolean, formId: string, createdAt: any, updatedAt: any, form: { __typename?: 'Form', id: string, name: string, description: string, steps: Array<{ __typename?: 'FormStep', name: string, step: number, notes?: string | null, fields: Array<{ __typename?: 'FormField', index?: number | null, name: string, type: Types.FieldType, text?: string | null, required?: boolean | null, value?: any | null, defaultValue?: any | null, disabled?: boolean | null, hidden?: boolean | null, notes?: string | null, placeholder?: string | null, options?: Array<{ __typename?: 'Option', notes?: string | null, text?: string | null, value: any }> | null, validations?: Array<{ __typename?: 'Validation', message?: string | null, type: Types.ValidationType, value?: number | null }> | null }> }> } } | null } };


export const EntryDocument = gql`
    query Entry($entryId: String!) {
  Entry(entryId: $entryId) {
    message
    status
    data {
      ...Entry
    }
  }
}
    ${EntryFragmentDoc}`;

/**
 * __useEntryQuery__
 *
 * To run a query within a React component, call `useEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntryQuery({
 *   variables: {
 *      entryId: // value for 'entryId'
 *   },
 * });
 */
export function useEntryQuery(baseOptions: Apollo.QueryHookOptions<EntryQuery, EntryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntryQuery, EntryQueryVariables>(EntryDocument, options);
      }
export function useEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntryQuery, EntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntryQuery, EntryQueryVariables>(EntryDocument, options);
        }
export type EntryQueryHookResult = ReturnType<typeof useEntryQuery>;
export type EntryLazyQueryHookResult = ReturnType<typeof useEntryLazyQuery>;
export type EntryQueryResult = Apollo.QueryResult<EntryQuery, EntryQueryVariables>;