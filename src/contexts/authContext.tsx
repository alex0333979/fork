import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useCookies } from 'react-cookie'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { FetchResult } from '@apollo/client/link/core'
import {
  Cart,
  useCreateGuestMutation,
  useMeLazyQuery,
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  User,
} from '@/apollo/index'

import {
  COOKIES_TOKEN_NAME,
  ROUTE_COOKIE_NAME,
  PRIVATE_ROUTES,
  TOKEN_EXPIRE_IN,
} from '@/constants/index'

interface IContextProps {
  isAuthenticated: boolean
  me: User | null
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
}

const AuthContext = createContext({} as IContextProps)

export function AuthProvider({
  children,
  client,
}: {
  children: ReactNode
  client: ApolloClient<NormalizedCacheObject>
}) {
  const auth = useProvideAuth(client)

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = (): IContextProps => useContext(AuthContext)

function useProvideAuth(
  apolloClient: ApolloClient<NormalizedCacheObject>,
): IContextProps {
  const [me, setMe] = useState<User | null>(null)
  const [cookies, setCookie, removeCookie] = useCookies([
    COOKIES_TOKEN_NAME,
    ROUTE_COOKIE_NAME,
  ])
  const [openSignIn, setOpenSignIn] = useState<boolean>(false)
  const [openSignUp, setOpenSignUp] = useState<boolean>(false)

  const [createGuest] = useCreateGuestMutation()
  const [fetchMe] = useMeLazyQuery({
    fetchPolicy: 'network-only',
  })

  const onCreateGuest = useCallback(async () => {
    const { data } = await createGuest()

    if (data?.CreateGuest.data?.accessToken) {
      setCookie(COOKIES_TOKEN_NAME, data?.CreateGuest.data?.accessToken, {
        path: '/',
        maxAge: TOKEN_EXPIRE_IN,
      })
    }
  }, [createGuest, setCookie])

  const autoLogin = useCallback(async (): Promise<boolean> => {
    const { data } = await fetchMe()
    if (data?.Me.data) {
      setMe(data.Me.data)
      return true
    }
    return false
  }, [fetchMe])

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

  const cart = useMemo(() => me?.cart || null, [me?.cart])

  const updateCart = useCallback(
    (cart: Cart | null) => {
      if (!me) return
      setMe({ ...me, cart })
    },
    [me],
  )

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
    me,
    setMe,
    autoLogin,
    createGuest: onCreateGuest,
    signIn,
    signOut,
    cart,
    updateCart,
    openSignIn,
    toggleSignInModal,
    openSignUp,
    toggleSignUpModal,
  }
}
