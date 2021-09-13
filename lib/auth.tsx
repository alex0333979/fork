import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  NormalizedCacheObject,
  ApolloQueryResult
} from '@apollo/client';
import {
  CreateGuestDocument,
  CreateGuestMutation,
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  MeDocument,
  MeQuery,
  User
} from '@/generated/graphql';
import { AppPropsType } from 'next/dist/shared/lib/utils';
import { useApollo } from './apolloClient';
import { FetchResult } from '@apollo/client/link/core';

interface IContextProps {
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  isAuthenticated: () => boolean;
  getMe: () => User | null;
  setMe: React.Dispatch<React.SetStateAction<User | null>>;
  canAutoLogin: () => boolean;
  createGuest: () => void;
  autoLogin: () => void;
  signIn: ({ email, password }: LoginMutationVariables) => void;
  signOut: () => void;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  getSavedEntries: () => string[];
  removeEntry: (entryId: string) => void;
  saveEntry: (entryId: string) => void;
  clearEntries: () => void;
}

const authContext = createContext({} as IContextProps);

export function AuthProvider({
  children,
  pageProps
}: {
  children: ReactNode;
  pageProps: AppPropsType['pageProps'];
}) {
  const apolloClient = useApollo(pageProps);
  const auth = useProvideAuth(apolloClient);

  return (
    <ApolloProvider client={apolloClient}>
      <authContext.Provider value={auth}>
        {children}
      </authContext.Provider>
    </ApolloProvider>
  );
}

export const useAuth = (): IContextProps => {
  return useContext(authContext);
};

function useProvideAuth(apolloClient: ApolloClient<NormalizedCacheObject>): IContextProps {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [me, setMe] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      await createGuest();
      await autoLogin();
    })()
  }, [])

  const isAuthenticated = (): boolean => {
    return !!(me && me.email);
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

  const createGuest = async () => {
    const { data }: FetchResult<CreateGuestMutation> = await apolloClient.mutate({
      mutation: CreateGuestDocument
    });
    if (data?.CreateGuest?.data?.accessToken) {
      setAuthToken(data?.CreateGuest?.data?.accessToken);
      rememberToken(data?.CreateGuest?.data?.accessToken);
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

  const getSavedEntries = (): string[] => {
    const strEntries = localStorage.getItem('biometric-photo.entries');
    return strEntries ? strEntries.split(',') : [];
  };

  const removeEntry = (entryId: string) => {
    const entries = getSavedEntries();
    const index = entries.indexOf(entryId);
    if (index > -1) {
      entries.splice(index, 1);
    }
  };

  const saveEntry = (entryId: string) => {
    const entries = getSavedEntries();
    entries.push(entryId);
    localStorage.setItem('biometric-photo.entries', entries.toString());
  };

  const clearEntries = () => {
    localStorage.setItem('biometric-photo.entries', '');
  };

  return {
    setAuthToken,
    isAuthenticated,
    getMe,
    setMe,
    canAutoLogin,
    autoLogin,
    createGuest,
    signIn,
    signOut,
    apolloClient,
    getSavedEntries,
    removeEntry,
    saveEntry,
    clearEntries
  };
}
