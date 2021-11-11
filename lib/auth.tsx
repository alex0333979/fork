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
  signOut: () => void;
  cart: Cart | null;
  updateCart: (cart: Cart | null) => void;
  openSignIn: boolean;
  toggleSignInModal: (show: boolean) => void;
  openSignUp: boolean;
  toggleSignUpModal: (show: boolean) => void;
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
  const [cookies, setCookie, removeCookie] = useCookies([COOKIES_TOKEN_NAME]);
  const [openSignIn, setOpenSignIn] = useState<boolean>(false);
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);

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

  const isAuthenticated = useMemo((): boolean => !(!me || (me && me.guest)), [me]);

  const getMe = useMemo((): User | null => me, [me]);

  const cart = useMemo(() => me?.cart ?? null, [me?.cart]);

  const updateCart = useCallback(
    (cart: Cart | null) => {
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

  const signOut = useCallback(() => {
    removeCookie(COOKIES_TOKEN_NAME);
    setMe(null);
  }, [removeCookie]);

  const toggleSignInModal = useCallback((show: boolean) => {
    if (show) {
      setOpenSignUp(false);
    }
    setOpenSignIn(show);
  }, []);

  const toggleSignUpModal = useCallback((show: boolean) => {
    if (show) {
      setOpenSignIn(false);
    }
    setOpenSignUp(show);
  }, []);

  return {
    isAuthenticated,
    getMe,
    setMe,
    autoLogin,
    createGuest,
    signIn,
    signOut,
    cart,
    updateCart,
    openSignIn,
    toggleSignInModal,
    openSignUp,
    toggleSignUpModal
  };
}
