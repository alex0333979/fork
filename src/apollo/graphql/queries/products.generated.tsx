import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ProductFragmentDoc } from '../fragments/product.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProductsQueryVariables = Types.Exact<{
  currencyCode?: Types.InputMaybe<Types.CurrencyCode>;
}>;


export type ProductsQuery = { __typename?: 'Query', Products: { __typename?: 'ProductsResponse', message: string, status: boolean, data: Array<{ __typename?: 'Product', sku: Types.ProductSku, price: number, category: Types.ProductCategory, description?: string | null, currency: { __typename?: 'Currency', label: Types.CurrencyType, code: Types.CurrencyCode, symbol: string } }> } };


export const ProductsDocument = gql`
    query Products($currencyCode: CurrencyCode) {
  Products(currencyCode: $currencyCode) {
    data {
      ...Product
    }
    message
    status
  }
}
    ${ProductFragmentDoc}`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      currencyCode: // value for 'currencyCode'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;