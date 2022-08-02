import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CurrencyFragmentDoc } from '../fragments/currency.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CurrenciesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrenciesQuery = { __typename?: 'Query', Currencies: { __typename?: 'CurrenciesResponse', message: string, status: boolean, data: Array<{ __typename?: 'Currency', label: Types.CurrencyType, code: Types.CurrencyCode, symbol: string }> } };


export const CurrenciesDocument = gql`
    query Currencies {
  Currencies {
    data {
      ...Currency
    }
    message
    status
  }
}
    ${CurrencyFragmentDoc}`;

/**
 * __useCurrenciesQuery__
 *
 * To run a query within a React component, call `useCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrenciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrenciesQuery(baseOptions?: Apollo.QueryHookOptions<CurrenciesQuery, CurrenciesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrenciesQuery, CurrenciesQueryVariables>(CurrenciesDocument, options);
      }
export function useCurrenciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrenciesQuery, CurrenciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrenciesQuery, CurrenciesQueryVariables>(CurrenciesDocument, options);
        }
export type CurrenciesQueryHookResult = ReturnType<typeof useCurrenciesQuery>;
export type CurrenciesLazyQueryHookResult = ReturnType<typeof useCurrenciesLazyQuery>;
export type CurrenciesQueryResult = Apollo.QueryResult<CurrenciesQuery, CurrenciesQueryVariables>;