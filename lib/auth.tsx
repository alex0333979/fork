import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import { ApolloClient, NormalizedCacheObject, ApolloQueryResult } from '@apollo/client';
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
import { FetchResult } from '@apollo/client/link/core';
import { useCookies } from 'react-cookie';

interface IContextProps {
  isAuthenticated: boolean;
  getMe: User | null;
  setMe: React.Dispatch<React.SetStateAction<User | null>>;
  createGuest: () => void;
  autoLogin: () => void;
  signIn: ({ email, password }: LoginMutationVariables) => void;
  getSavedEntries: () => string[];
  removeEntry: (entryId: string | null) => string[];
  saveEntry: (entryId: string) => string[];
  clearEntries: () => void;
}

const authContext = createContext({} as IContextProps);

export function AuthProvider({
  children,
  client
}: {
  children: ReactNode;
  client: ApolloClient<NormalizedCacheObject>;
}) {
  const auth = useProvideAuth(client);

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = (): IContextProps => useContext(authContext);

function useProvideAuth(apolloClient: ApolloClient<NormalizedCacheObject>): IContextProps {
  const [me, setMe] = useState<User | null>(null);
  const [, setCookie] = useCookies(['token']);

  useEffect(() => {
    (async () => {
      await createGuest();
      await autoLogin();
    })();
  }, []);

  const isAuthenticated = useMemo((): boolean => !!(me && me.email), [me]);

  const getMe = useMemo((): User | null => me, [me]);

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
    const { data }: FetchResult<CreateGuestMutation> = await apolloClient.mutate({
      mutation: CreateGuestDocument
    });
    console.log(data);
    if (data?.CreateGuest.data?.accessToken) {
      setCookie('token', data?.CreateGuest.data?.accessToken, { path: '/' });
    }
  }, [apolloClient, setCookie]);

  const signIn = useCallback(
    async ({ email, password }: LoginMutationVariables) => {
      const { data }: FetchResult<LoginMutation> = await apolloClient.mutate({
        mutation: LoginDocument,
        variables: {
          email,
          password
        }
      });
      console.log(data);
      if (data?.Login.data?.accessToken) {
        setCookie('token', data?.Login.data?.accessToken, { path: '/' });
      }
    },
    [apolloClient, setCookie]
  );

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
    getSavedEntries,
    removeEntry,
    saveEntry,
    clearEntries
  };
}
