import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSignedUrlQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSignedUrlQuery = { __typename?: 'Query', GetSignedUrl: { __typename?: 'SignedUrlResponse', message: string, status: boolean, data?: { __typename?: 'SignedUrl', url: string, signedUrl: string } | null } };


export const GetSignedUrlDocument = gql`
    query GetSignedUrl {
  GetSignedUrl {
    message
    status
    data {
      url
      signedUrl
    }
  }
}
    `;

/**
 * __useGetSignedUrlQuery__
 *
 * To run a query within a React component, call `useGetSignedUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSignedUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSignedUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSignedUrlQuery(baseOptions?: Apollo.QueryHookOptions<GetSignedUrlQuery, GetSignedUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSignedUrlQuery, GetSignedUrlQueryVariables>(GetSignedUrlDocument, options);
      }
export function useGetSignedUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSignedUrlQuery, GetSignedUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSignedUrlQuery, GetSignedUrlQueryVariables>(GetSignedUrlDocument, options);
        }
export type GetSignedUrlQueryHookResult = ReturnType<typeof useGetSignedUrlQuery>;
export type GetSignedUrlLazyQueryHookResult = ReturnType<typeof useGetSignedUrlLazyQuery>;
export type GetSignedUrlQueryResult = Apollo.QueryResult<GetSignedUrlQuery, GetSignedUrlQueryVariables>;