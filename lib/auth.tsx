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
  Cart,
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
import { COOKIES_TOKEN_NAME } from '@/lib/apolloClient';

interface IContextProps {
  isAuthenticated: boolean;
  getMe: User | null;
  setMe: React.Dispatch<React.SetStateAction<User | null>>;
  createGuest: () => void;
  autoLogin: () => void;
  signIn: ({ email, password }: LoginMutationVariables) => void;
  savedEntries: string[];
  removeEntry: (entryId: string | null) => string[];
  saveEntry: (entryId: string) => string[];
  clearEntries: () => void;
  cart: Cart | null;
  updateCart: (cart: Cart) => void;
}

export const COOKIE_ENTRIES = 'entries';

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
  const [cookies, setCookie] = useCookies([COOKIES_TOKEN_NAME, COOKIE_ENTRIES]);

  const createGuest = useCallback(async () => {
    const { data }: FetchResult<CreateGuestMutation> = await apolloClient.mutate({
      mutation: CreateGuestDocument
    });
    if (data?.CreateGuest.data?.accessToken) {
      setCookie(COOKIES_TOKEN_NAME, data?.CreateGuest.data?.accessToken, {
        path: '/',
        maxAge: 604800
      });
    }
  }, [apolloClient, setCookie]);

  const autoLogin = useCallback(async () => {
    const { data }: ApolloQueryResult<MeQuery> = await apolloClient.query({
      query: MeDocument,
      variables: {}
    });
    if (data?.Me.data) {
      setMe(data.Me.data);
    }
  }, [apolloClient]);

  useEffect(() => {
    (async () => {
      try {
        const token = cookies[COOKIES_TOKEN_NAME];
        if (!token) {
          await createGuest();
        }
        await autoLogin();
      } catch {
        await createGuest();
        await autoLogin();
      }
    })();
  }, [autoLogin, cookies, createGuest]);

  const isAuthenticated = useMemo((): boolean => !!(me && me.email), [me]);

  const getMe = useMemo((): User | null => me, [me]);

  const cart = useMemo(() => me?.cart ?? null, [me?.cart]);

  const updateCart = useCallback(
    (cart: Cart) => {
      if (me) {
        setMe({
          ...me,
          cart
        });
      }
    },
    [me]
  );

  const signIn = useCallback(
    async ({ email, password }: LoginMutationVariables) => {
      const { data }: FetchResult<LoginMutation> = await apolloClient.mutate({
        mutation: LoginDocument,
        variables: {
          email,
          password
        }
      });
      if (data?.Login.data?.accessToken) {
        setCookie(COOKIES_TOKEN_NAME, data?.Login.data?.accessToken, { path: '/', maxAge: 604800 });
      }
    },
    [apolloClient, setCookie]
  );

  const savedEntries = useMemo((): string[] => {
    const strEntries = cookies[COOKIE_ENTRIES];
    return strEntries ? strEntries.split(',') : [];
  }, [cookies]);

  const removeEntry = useCallback(
    (entryId: string | null): string[] => {
      if (!entryId) {
        return savedEntries;
      }
      const index = savedEntries.indexOf(entryId);
      if (index > -1) {
        savedEntries.splice(index, 1);
      }
      setCookie(COOKIE_ENTRIES, savedEntries.toString(), { path: '/', maxAge: 604800 });
      return savedEntries;
    },
    [savedEntries, setCookie]
  );

  const saveEntry = (entryId: string): string[] => {
    if (!savedEntries.includes(entryId)) {
      savedEntries.push(entryId);
      setCookie(COOKIE_ENTRIES, savedEntries.toString(), { path: '/', maxAge: 86000 });
    }
    return savedEntries;
  };

  const clearEntries = () => {
    setCookie(COOKIE_ENTRIES, '');
  };

  return {
    isAuthenticated,
    getMe,
    setMe,
    autoLogin,
    createGuest,
    signIn,
    savedEntries,
    removeEntry,
    saveEntry,
    clearEntries,
    cart,
    updateCart
  };
}
