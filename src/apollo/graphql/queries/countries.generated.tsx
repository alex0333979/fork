import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CountryFragmentDoc } from '../fragments/country.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CountriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CountriesQuery = { __typename?: 'Query', Countries: { __typename?: 'CountriesResponse', total: number, data: Array<{ __typename?: 'Country', id?: number | null, country?: string | null, type?: string | null, countryCode?: string | null }> } };


export const CountriesDocument = gql`
    query Countries {
  Countries {
    data {
      ...Country
    }
    total
  }
}
    ${CountryFragmentDoc}`;

/**
 * __useCountriesQuery__
 *
 * To run a query within a React component, call `useCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountriesQuery(baseOptions?: Apollo.QueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
      }
export function useCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
        }
export type CountriesQueryHookResult = ReturnType<typeof useCountriesQuery>;
export type CountriesLazyQueryHookResult = ReturnType<typeof useCountriesLazyQuery>;
export type CountriesQueryResult = Apollo.QueryResult<CountriesQuery, CountriesQueryVariables>;