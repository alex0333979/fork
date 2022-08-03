import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useCookies } from 'react-cookie'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
  Cart,
  useCreateGuestMutation,
  useMeLazyQuery,
  useLoginMutation,
  LoginMutationVariables,
  User,
} from '@/apollo'

import {
  COOKIES_TOKEN_NAME,
  ROUTE_COOKIE_NAME,
  PRIVATE_ROUTES,
  TOKEN_EXPIRE_IN,
} from '@/constants'

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

export const AuthContext = createContext({} as IContextProps)

export const AuthProvider = ({
  children,
}: {
  children: ReactNode
  client: ApolloClient<NormalizedCacheObject>
}) => {
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
  const [login] = useLoginMutation()

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
      const { data } = await login({
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
    [login, setCookie],
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

  return (
    <AuthContext.Provider
      value={{
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
      }}>
      {children}
    </AuthContext.Provider>
  )
}
