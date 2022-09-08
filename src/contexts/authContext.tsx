/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
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
  signIn: ({ email, password }: LoginMutationVariables) => void
  signOut: () => void
  cart: Cart | null
  updateMe: (d: Partial<User>) => void
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

  const timer = useRef<NodeJS.Timeout | null>(null)

  const [fetchMe, { error: authError }] = useMeLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: (res) => {
      if (res.Me.data) {
        setMe(res.Me.data)
      }
    },
  })

  const [createGuest] = useCreateGuestMutation({
    onCompleted: (res) => {
      if (res.CreateGuest.data?.accessToken) {
        setCookie(COOKIES_TOKEN_NAME, res?.CreateGuest.data?.accessToken, {
          path: '/',
          maxAge: TOKEN_EXPIRE_IN,
        })
      }
    },
  })

  const [login] = useLoginMutation()

  useEffect(() => {
    if (cookies[COOKIES_TOKEN_NAME] && !me) {
      fetchMe()
    }
  }, [cookies, fetchMe, me])

  useEffect(() => {
    if (authError?.message === 'Unauthorized') {
      removeCookie(COOKIES_TOKEN_NAME)
    }
  }, [authError?.message, removeCookie])

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    const isPrivateRoute = PRIVATE_ROUTES.some((r) =>
      location.pathname.includes(r),
    )
    if (!isPrivateRoute) {
      timer.current = setTimeout(() => {
        const token = cookies[COOKIES_TOKEN_NAME]
        if (!token) {
          createGuest()
        }
      }, 300)
    }

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [cookies, createGuest])

  const isAuthenticated = useMemo((): boolean => Boolean(me), [me])

  const cart = useMemo(() => me?.cart || null, [me?.cart])

  const updateMe = useCallback((d: Partial<User>) => {
    // @ts-ignore
    setMe((m) => ({ ...(m || {}), ...d }))
  }, [])

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
        signIn,
        signOut,
        cart,
        updateMe,
        openSignIn,
        toggleSignInModal,
        openSignUp,
        toggleSignUpModal,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
