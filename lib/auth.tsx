import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
  useCallback
} from 'react';
import {
  ApolloProvider,
  ApolloClient,
  NormalizedCacheObject,
  ApolloQueryResult
} from '@apollo/client';
import {
  CreateGuestDocument,
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
  isAuthenticated: () => boolean;
  getMe: () => User | null;
  setMe: React.Dispatch<React.SetStateAction<User | null>>;
  createGuest: () => void;
  autoLogin: () => void;
  signIn: ({ email, password }: LoginMutationVariables) => void;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  getSavedEntries: () => string[];
  removeEntry: (entryId: string | null) => string[];
  saveEntry: (entryId: string) => string[];
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
      <authContext.Provider value={auth}>{children}</authContext.Provider>
    </ApolloProvider>
  );
}

export const useAuth = (): IContextProps => useContext(authContext);

function useProvideAuth(apolloClient: ApolloClient<NormalizedCacheObject>): IContextProps {
  const [me, setMe] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      await createGuest();
      await autoLogin();
    })();
  }, []);

  const isAuthenticated = (): boolean => !!(me && me.email);

  const getMe = (): User | null => me;

  const autoLogin = useCallback(async () => {
    const { data }: ApolloQueryResult<MeQuery> = await apolloClient.query({
      query: MeDocument,
      variables: {}
    });
    if (data?.Me.data) {
      setMe(data.Me.data);
    }
  }, [apolloClient]);

  const createGuest = useCallback(async () => {
    await apolloClient.mutate({
      mutation: CreateGuestDocument
    });
  }, [apolloClient]);

  const signIn = async ({ email, password }: LoginMutationVariables) => {
    const { data }: FetchResult<LoginMutation> = await apolloClient.mutate({
      mutation: LoginDocument,
      variables: {
        email,
        password
      }
    });
    console.log(data);
  };

  const getSavedEntries = (): string[] => {
    if (typeof window === 'undefined') {
      return [];
    }
    const strEntries = localStorage.getItem('biometric-photo.entries');
    return strEntries ? strEntries.split(',') : [];
  };

  const removeEntry = (entryId: string | null): string[] => {
    const entries = getSavedEntries();
    if (!entryId) {
      return entries;
    }
    const index = entries.indexOf(entryId);
    if (index > -1) {
      entries.splice(index, 1);
    }
    localStorage.setItem('biometric-photo.entries', entries.toString());
    return entries;
  };

  const saveEntry = (entryId: string): string[] => {
    if (typeof window === 'undefined') {
      return [];
    }
    const entries = getSavedEntries();
    if (!entries.includes(entryId)) {
      entries.push(entryId);
      localStorage.setItem('biometric-photo.entries', entries.toString());
    }
    return entries;
  };

  const clearEntries = () => {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem('biometric-photo.entries', '');
  };

  return {
    isAuthenticated,
    getMe,
    setMe,
    autoLogin,
    createGuest,
    signIn,
    apolloClient,
    getSavedEntries,
    removeEntry,
    saveEntry,
    clearEntries
  };
}
