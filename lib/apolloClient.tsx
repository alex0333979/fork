import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client';
import merge from 'deepmerge';
import { IncomingHttpHeaders, IncomingMessage } from 'http';
import isEqual from 'lodash/isEqual';
import type { AppProps } from 'next/app';
import { useMemo } from 'react';
import { setContext } from '@apollo/client/link/context';
import cookie from 'cookie';

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
export const COOKIES_TOKEN_NAME = 'jwt';

const getToken = (req?: IncomingMessage) => {
  const parsedCookie = cookie.parse(req ? req.headers.cookie ?? '' : document.cookie);

  return parsedCookie[COOKIES_TOKEN_NAME];
};

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
  const httpLink = createHttpLink({
    uri: 'http://biome-biome-1isz2e3x3rda8-1558187189.eu-central-1.elb.amazonaws.com/graphql',
    // credentials: 'include'
    headers: {
      ...headers
    }
  });

  const authLink = setContext((_, { headers }) => {
    // get token from cookie
    const token = getToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  const omitTypename = (key: string, value: any) => (key === '__typename' ? undefined : value);

  const omitTypenameLink = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
    }
    return forward(operation);
  });

  return new ApolloClient({
    // SSR only for Node.js
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([omitTypenameLink, authLink, httpLink]),
    cache: new InMemoryCache()
  });
};

type InitialState = NormalizedCacheObject | undefined;

interface IInitializeApollo {
  headers?: IncomingHttpHeaders | null;
  initialState?: InitialState | null;
}

export const initializeApollo = (
  { headers, initialState }: IInitializeApollo = {
    headers: null,
    initialState: null
  }
) => {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s)))
      ]
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps']
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  return useMemo(() => initializeApollo({ initialState: state }), [state]);
}
