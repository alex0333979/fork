import React, { useState, useContext, createContext, ReactNode } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  NormalizedCacheObject,
  ApolloQueryResult
} from '@apollo/client';
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  MeDocument,
  MeQuery,
  User
} from '../graphql/generated/graphql';
import { AppPropsType } from 'next/dist/shared/lib/utils';
import { useApollo } from './apolloClient';
import { IncomingHttpHeaders } from 'http';
import { FetchResult } from '@apollo/client/link/core';

interface IContextProps {
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  isAuthenticated: () => boolean;
  getMe: () => User | null;
  setMe: React.Dispatch<React.SetStateAction<User | null>>;
  canAutoLogin: () => boolean;
  autoLogin: () => void;
  signIn: ({ email, password }: LoginMutationVariables) => void;
  signOut: () => void;
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

const authContext = createContext({} as IContextProps);

export function AuthProvider({
  children,
  pageProps
}: {
  children: ReactNode;
  pageProps: AppPropsType['pageProps'];
}) {
  const auth = useProvideAuth(pageProps);

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.apolloClient}>{children}</ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = (): IContextProps => {
  return useContext(authContext);
};

function useProvideAuth(pageProps: AppPropsType['pageProps']): IContextProps {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [me, setMe] = useState<User | null>(null);

  const isAuthenticated = (): boolean => {
    return !!authToken;
  };

  const getMe = (): User | null => {
    return me;
  };

  const rememberToken = (token: string) => {
    localStorage.setItem('biometric-photo.token', token);
  };

  const getToken = (): string | null => {
    return localStorage.getItem('biometric-photo.token');
  };

  const canAutoLogin = (): boolean => {
    return getToken() !== null;
  };

  const getAuthHeaders = (): IncomingHttpHeaders | undefined => {
    if (!authToken) return undefined;

    return {
      authorization: `Bearer ${authToken}`
    };
  };

  const apolloClient = useApollo(pageProps, getAuthHeaders());

  const autoLogin = async () => {
    const token = getToken();
    if (token === null) {
      return;
    }
    const { data }: ApolloQueryResult<MeQuery> = await apolloClient.query({
      query: MeDocument,
      variables: {}
    });
    if (data?.Me.data) {
      rememberToken(token);
      setMe(data.Me.data);
    }
  };

  const signIn = async ({ email, password }: LoginMutationVariables) => {
    const { data }: FetchResult<LoginMutation> = await apolloClient.mutate({
      mutation: LoginDocument,
      variables: {
        email: email,
        password: password
      }
    });

    console.log(data);

    if (data?.Login?.data?.accessToken) {
      setAuthToken(data?.Login?.data?.accessToken);
      rememberToken(data?.Login?.data?.accessToken);
    }
  };

  const signOut = () => {
    setAuthToken(null);
  };

  return {
    setAuthToken,
    isAuthenticated,
    getMe,
    setMe,
    canAutoLogin,
    autoLogin,
    signIn,
    signOut,
    apolloClient
  };
}
