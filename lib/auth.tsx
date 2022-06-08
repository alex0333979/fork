/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
} from '@apollo/client'
import {
  Cart,
  CreateGuestDocument,
  CreateGuestMutation,
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  MeDocument,
  MeQuery,
  User,
} from '@/generated/graphql'
import { FetchResult } from '@apollo/client/link/core'
import { useCookies } from 'react-cookie'
import {
  COOKIES_TOKEN_NAME,
  LANGUAGE_COOKIE_NAME,
  CURRENCY_COOKIE_NAME,
  ROUTE_COOKIE_NAME,
} from '@/lib/apolloClient'
import {
  currencies,
  languages,
  ICurrency,
  ILanguage,
} from '@/constants/languageCurrencies'
import { PRIVATE_ROUTES, TOKEN_EXPIRE_IN } from '@/constants/index'

interface IContextProps {
  isAuthenticated: boolean
  getMe: User | null
  setMe: React.Dispatch<React.SetStateAction<User | null>>
  createGuest: () => void
  autoLogin: () => void
  signIn: ({ email, password }: LoginMutationVariables) => void
  signOut: () => void
  cart: Cart | null
  updateCart: (cart: Cart | null) => void
  openSignIn: boolean
  toggleSignInModal: (show: boolean) => void
  openSignUp: boolean
  toggleSignUpModal: (show: boolean) => void
  openDocument: boolean
  setOpenDocument: React.Dispatch<React.SetStateAction<boolean>>
  language: ILanguage
  currency: ICurrency
  onSetPreference: (language?: string, currency?: string) => void
}

const authContext = createContext({} as IContextProps)

export function AuthProvider({
  children,
  client,
}: {
  children: ReactNode
  client: ApolloClient<NormalizedCacheObject>
}) {
  const auth = useProvideAuth(client)

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = (): IContextProps => useContext(authContext)

function useProvideAuth(
  apolloClient: ApolloClient<NormalizedCacheObject>,
): IContextProps {
  const [me, setMe] = useState<User | null>(null)
  const [cookies, setCookie, removeCookie] = useCookies([
    COOKIES_TOKEN_NAME,
    LANGUAGE_COOKIE_NAME,
    CURRENCY_COOKIE_NAME,
    ROUTE_COOKIE_NAME,
  ])
  const [openSignIn, setOpenSignIn] = useState<boolean>(false)
  const [openSignUp, setOpenSignUp] = useState<boolean>(false)
  const [openDocument, setOpenDocument] = useState<boolean>(false)

  const createGuest = useCallback(async () => {
    const { data }: FetchResult<CreateGuestMutation> =
      await apolloClient.mutate({
        mutation: CreateGuestDocument,
      })
    if (data?.CreateGuest.data?.accessToken) {
      setCookie(COOKIES_TOKEN_NAME, data?.CreateGuest.data?.accessToken, {
        path: '/',
        maxAge: TOKEN_EXPIRE_IN,
      })
    }
  }, [apolloClient, setCookie])

  const onSetPreference = useCallback(
    (lang?: string, cur?: string) => {
      if (lang) {
        setCookie(LANGUAGE_COOKIE_NAME, lang, {
          path: '/',
        })
      }
      if (cur) {
        setCookie(CURRENCY_COOKIE_NAME, cur, {
          path: '/',
        })
      }
    },
    [setCookie],
  )

  const autoLogin = useCallback(async (): Promise<boolean> => {
    const { data }: ApolloQueryResult<MeQuery> = await apolloClient.query({
      query: MeDocument,
      variables: {},
    })
    if (data?.Me.data) {
      setMe(data.Me.data)
      return true
    }
    return false
  }, [apolloClient])

  useEffect(() => {
    ;(async () => {
      const isPrivateRoute = PRIVATE_ROUTES.some((r) =>
        location.pathname.includes(r),
      )
      if (isPrivateRoute) return

      try {
        const token = cookies[COOKIES_TOKEN_NAME]
        if (!token) {
          await createGuest()
        }
        const result = await autoLogin()
        if (!result) {
          await createGuest()
          await autoLogin()
        }
      } catch {
        await createGuest()
        await autoLogin()
      }
    })()
  }, [autoLogin, cookies, createGuest])

  const isAuthenticated = useMemo((): boolean => Boolean(me), [me])

  const getMe = useMemo((): User | null => me, [me])

  const cart = useMemo(() => me?.cart || null, [me?.cart])

  const currency: ICurrency = useMemo(() => {
    const _cookieCur = cookies[CURRENCY_COOKIE_NAME] || 'us'
    const _currency: ICurrency | undefined = currencies.find(
      (c) => c.value === _cookieCur,
    )

    return _currency || currencies[0]
  }, [cookies])

  const language: ILanguage = useMemo(() => {
    const _cookieLang = cookies[LANGUAGE_COOKIE_NAME] || 'en'
    const _language: ILanguage | undefined = languages.find(
      (c) => c.value === _cookieLang,
    )

    return _language || languages[0]
  }, [cookies])

  const updateCart = useCallback((cart: Cart | null) => {
    // @ts-ignore
    setMe((m) => ({ ...(m || {}), cart }))
  }, [])

  const signIn = useCallback(
    async ({ email, password }: LoginMutationVariables) => {
      const { data }: FetchResult<LoginMutation> = await apolloClient.mutate({
        mutation: LoginDocument,
        variables: {
          email,
          password,
        },
      })
      if (data?.Login.data?.accessToken) {
        setCookie(COOKIES_TOKEN_NAME, data?.Login.data?.accessToken, {
          path: '/',
          maxAge: TOKEN_EXPIRE_IN,
        })
      }
    },
    [apolloClient, setCookie],
  )

  const signOut = useCallback(() => {
    removeCookie(COOKIES_TOKEN_NAME)
    setMe(null)
  }, [removeCookie])

  const toggleSignInModal = useCallback((show: boolean) => {
    if (show) {
      setOpenSignUp(false)
    }
    setOpenSignIn(show)
  }, [])

  const toggleSignUpModal = useCallback((show: boolean) => {
    if (show) {
      setOpenSignIn(false)
    }
    setOpenSignUp(show)
  }, [])

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
    toggleSignUpModal,
    openDocument,
    setOpenDocument,
    language,
    currency,
    onSetPreference,
  }
}
