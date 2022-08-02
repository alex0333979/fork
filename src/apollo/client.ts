import { useMemo } from 'react'
import { GetServerSidePropsContext } from 'next'
import type { AppProps } from 'next/app'
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/link-error'
import cookie from 'cookie'
import merge from 'deepmerge'
import { IncomingMessage } from 'http'
import isEqual from 'lodash/isEqual'

import { showError } from '@/hooks/index'
import { COOKIES_TOKEN_NAME, APOLLO_STATE_PROP_NAME } from '@/constants/index'

const getToken = (req?: IncomingMessage) => {
  const parsedCookie = cookie.parse(
    req
      ? req.headers.cookie ?? ''
      : typeof window === 'undefined'
      ? ''
      : document.cookie,
  )

  return parsedCookie[COOKIES_TOKEN_NAME]
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const createApolloClient = (ctx?: GetServerSidePropsContext) => {
  const httpLink = createHttpLink({
    uri: process.env.API_BASE_URL,
    // credentials: 'include'
  })

  const authLink = setContext((_, { headers }) => {
    // get token from cookie
    const token = getToken(ctx?.req)

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const omitTypename = (key: string, value: any) =>
    key === '__typename' ? undefined : value

  const omitTypenameLink = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      operation.variables = JSON.parse(
        JSON.stringify(operation.variables),
        omitTypename,
      )
    }
    return forward(operation)
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        )
        if (message !== 'Unauthorized') {
          showError(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          )
        }
      })
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
      showError(`[Network error]: ${networkError.message}`)
    }
  })

  return new ApolloClient({
    // SSR only for Node.js
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([omitTypenameLink, authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  })
}

export const initializeApollo = (
  initialState?: AppProps['pageProps'],
  ctx?: GetServerSidePropsContext,
) => {
  const _apolloClient = apolloClient ?? createApolloClient(ctx)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps'],
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  return useMemo(() => initializeApollo(state), [state])
}
