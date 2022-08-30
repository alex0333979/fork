import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { PDocumentFragmentDoc } from '../fragments/pDocument.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DocumentsByCountryQueryVariables = Types.Exact<{
  country: Types.Scalars['String'];
}>;


export type DocumentsByCountryQuery = { __typename?: 'Query', DocumentsByCountry: { __typename?: 'PDocumentsResponse', total: number, data: Array<{ __typename?: 'PDocument', id?: number | null, country?: string | null, type?: string | null, countryCode?: string | null, background?: string | null, dpi?: number | null, dimensions?: { __typename?: 'Dimensions', height?: number | null, unit?: string | null, width?: number | null } | null, size?: { __typename?: 'Size', max?: number | null, min?: number | null } | null, head?: { __typename?: 'Head', Dimensions?: { __typename?: 'Dimensions', height?: number | null, unit?: string | null, width?: number | null } | null, position?: { __typename?: 'Position', max?: number | null, min?: number | null, unit?: Types.Unit | null } | null } | null }> } };


export const DocumentsByCountryDocument = gql`
    query DocumentsByCountry($country: String!) {
  DocumentsByCountry(country: $country) {
    data {
      ...PDocument
    }
    total
  }
}
    ${PDocumentFragmentDoc}`;

/**
 * __useDocumentsByCountryQuery__
 *
 * To run a query within a React component, call `useDocumentsByCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentsByCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentsByCountryQuery({
 *   variables: {
 *      country: // value for 'country'
 *   },
 * });
 */
export function useDocumentsByCountryQuery(baseOptions: Apollo.QueryHookOptions<DocumentsByCountryQuery, DocumentsByCountryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DocumentsByCountryQuery, DocumentsByCountryQueryVariables>(DocumentsByCountryDocument, options);
      }
export function useDocumentsByCountryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DocumentsByCountryQuery, DocumentsByCountryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DocumentsByCountryQuery, DocumentsByCountryQueryVariables>(DocumentsByCountryDocument, options);
        }
export type DocumentsByCountryQueryHookResult = ReturnType<typeof useDocumentsByCountryQuery>;
export type DocumentsByCountryLazyQueryHookResult = ReturnType<typeof useDocumentsByCountryLazyQuery>;
export type DocumentsByCountryQueryResult = Apollo.QueryResult<DocumentsByCountryQuery, DocumentsByCountryQueryVariables>;