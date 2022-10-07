import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { PDocumentFragmentDoc } from '../fragments/pDocument.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DocumentQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DocumentQuery = { __typename?: 'Query', Document: { __typename?: 'PDocumentResponse', message: string, status: boolean, data?: { __typename?: 'PDocument', id?: number | null, country?: string | null, type?: string | null, countryCode?: string | null, background?: string | null, dpi?: number | null, dimensions?: { __typename?: 'Dimensions', height?: number | null, unit?: string | null, width?: number | null } | null, size?: { __typename?: 'Size', max?: number | null, min?: number | null } | null, head?: { __typename?: 'Head', Dimensions?: { __typename?: 'Dimensions', height?: number | null, unit?: string | null, width?: number | null } | null, position?: { __typename?: 'Position', max?: number | null, min?: number | null, unit?: Types.Unit | null } | null } | null } | null } };


export const DocumentDocument = gql`
    query Document($id: String!) {
  Document(id: $id) {
    message
    status
    data {
      ...PDocument
    }
  }
}
    ${PDocumentFragmentDoc}`;

/**
 * __useDocumentQuery__
 *
 * To run a query within a React component, call `useDocumentQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDocumentQuery(baseOptions: Apollo.QueryHookOptions<DocumentQuery, DocumentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DocumentQuery, DocumentQueryVariables>(DocumentDocument, options);
      }
export function useDocumentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DocumentQuery, DocumentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DocumentQuery, DocumentQueryVariables>(DocumentDocument, options);
        }
export type DocumentQueryHookResult = ReturnType<typeof useDocumentQuery>;
export type DocumentLazyQueryHookResult = ReturnType<typeof useDocumentLazyQuery>;
export type DocumentQueryResult = Apollo.QueryResult<DocumentQuery, DocumentQueryVariables>;