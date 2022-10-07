import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OrderSkusQueryVariables = Types.Exact<{
  orderNumber: Types.Scalars['Float'];
}>;


export type OrderSkusQuery = { __typename?: 'Query', OrderByOrderNumber: { __typename?: 'OrderResponse', message: string, status: boolean, data?: { __typename?: 'Order', skus?: Array<string> | null } | null } };


export const OrderSkusDocument = gql`
    query OrderSkus($orderNumber: Float!) {
  OrderByOrderNumber(orderNumber: $orderNumber) {
    message
    status
    data {
      skus
    }
  }
}
    `;

/**
 * __useOrderSkusQuery__
 *
 * To run a query within a React component, call `useOrderSkusQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderSkusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderSkusQuery({
 *   variables: {
 *      orderNumber: // value for 'orderNumber'
 *   },
 * });
 */
export function useOrderSkusQuery(baseOptions: Apollo.QueryHookOptions<OrderSkusQuery, OrderSkusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderSkusQuery, OrderSkusQueryVariables>(OrderSkusDocument, options);
      }
export function useOrderSkusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderSkusQuery, OrderSkusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderSkusQuery, OrderSkusQueryVariables>(OrderSkusDocument, options);
        }
export type OrderSkusQueryHookResult = ReturnType<typeof useOrderSkusQuery>;
export type OrderSkusLazyQueryHookResult = ReturnType<typeof useOrderSkusLazyQuery>;
export type OrderSkusQueryResult = Apollo.QueryResult<OrderSkusQuery, OrderSkusQueryVariables>;