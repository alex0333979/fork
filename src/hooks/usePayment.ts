/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMemo, useCallback, useEffect, useState, useRef } from 'react'
import {
  PaymentIntent,
  Stripe,
  StripeCardElement,
  StripeElements,
  StripeError,
} from '@stripe/stripe-js'
import { CardElement } from '@stripe/react-stripe-js'
import { useCookies } from 'react-cookie'

import {
  CurrencyType,
  Order,
  ProductSku,
  ShippingType,
  CartItem,
  useClearCartMutation,
  useCreateOrderMutation,
  useGetPaymentIntentMutation,
} from '@/apollo'
import { useProducts, useLocation, useCurrency, useAuth } from '@/hooks'
import { Maybe, ValidationError } from '@/types'
import { showError, showSuccess, humanize } from '@/utils'
import { TEMP_ORDER_NUM, shippingTypes } from '@/constants'

interface IUsePayment {
  stripe: Stripe | null
  stripeElements: StripeElements | null
  shippingType: Maybe<ShippingType>
  items: CartItem[]
  billingAddressState: Maybe<string>
  callback: (isSuccess?: boolean) => void
}

export const usePayment = ({
  stripe,
  stripeElements,
  shippingType,
  items,
  billingAddressState,
  callback,
}: IUsePayment) => {
  const [, setCookie] = useCookies([TEMP_ORDER_NUM])
  const { getProduct } = useProducts()
  const { country } = useLocation()
  const { currentCurrency } = useCurrency()
  const { updateMe } = useAuth()

  const [newOrder, setNewOrder] = useState<Order | undefined>()
  const [cardName, setCardName] = useState<string>('')
  const [error, setError] = useState<ValidationError>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [payment, setPayment] = useState({ status: 'initial' })
  const [paymentRequest, setPaymentRequest] = useState<any>(null)
  const [stripeFocus, setStripeFocus] = useState<boolean>(false)

  const timer = useRef<NodeJS.Timeout | null>()

  const [createOrder] = useCreateOrderMutation()
  const [getPaymentIntent] = useGetPaymentIntentMutation()
  const [clearCart] = useClearCartMutation()

  const shippingPrice = useMemo(() => {
    const productSku = shippingTypes(country?.value).find(
      (s) => s.value === shippingType,
    )?.productSku

    if (!productSku) return 0

    return getProduct(productSku)?.price || 0
  }, [shippingType, country?.value, getProduct])

  const conciergePrice = useMemo(() => {
    if (shippingType === ShippingType.NoShipping) return 0
    const product = getProduct(ProductSku.PrintShipService)

    return product?.price || 0
  }, [shippingType, getProduct])

  const subTotal = useMemo(
    () =>
      (items
        .filter((i) => i.isComplete)
        .reduce((a, { productSku }) => {
          const product = getProduct(productSku)
          return a + (product?.price || 0)
        }, 0) ?? 0) +
      conciergePrice +
      shippingPrice,
    [conciergePrice, getProduct, items, shippingPrice],
  )

  const tax = useMemo(() => {
    if (billingAddressState === 'NY') {
      return parseFloat((subTotal * 0.08875).toFixed(2))
    }
    return 0
  }, [billingAddressState, subTotal])

  const total = useMemo(() => subTotal + tax, [tax, subTotal])

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError((errors) => ({
        ...errors,
        cardName: '',
      }))
      setCardName(e.target.value)
    },
    [],
  )

  const onCreateOrder = useCallback(async (): Promise<Order | undefined> => {
    if (newOrder) return newOrder
    setLoading(true)
    const { data } = await createOrder({})
    setLoading(false)

    const order = data?.CreateOrder.data
    if (!order) {
      setPayment({ status: 'error' })
      setError((errors) => ({
        ...errors,
        result: 'Create order is failed.',
      }))
      return
    }
    setNewOrder(order)
    return order
  }, [createOrder, newOrder])

  const getClientSecret = useCallback(
    async (order: Order): Promise<string | undefined> => {
      setLoading(true)
      const { data: intent } = await getPaymentIntent({
        variables: {
          orderId: order.id,
          currency: currentCurrency.label.toLowerCase(),
        },
      })
      setLoading(false)
      const clientSecret = intent?.GetPaymentIntent.data?.clientSecret
      if (!clientSecret) {
        setPayment({ status: 'error' })
        setError((errors) => ({
          ...errors,
          result: 'Get payment intent is failed',
        }))
        return
      }
      return clientSecret
    },
    [currentCurrency.label, getPaymentIntent],
  )

  const finalizeResult = useCallback(
    async (
      order: Order,
      cardElement: StripeCardElement | undefined,
      error: StripeError | undefined,
      paymentIntent: PaymentIntent | undefined,
    ) => {
      if (error) {
        showError(error.message ?? 'An unknown error occurred')
        setPayment({ status: 'error' })
        setError((errors) => ({
          ...errors,
          result: error.message ?? 'An unknown error occurred',
        }))
        cardElement?.clear()
        callback(false)
      } else if (paymentIntent) {
        showSuccess('Payment is done successfully.')
        setPayment(paymentIntent)
        const { data } = await clearCart({})
        const cart = data?.ClearCart.data
        if (cart) {
          updateMe({ cart })
        }

        // @ts-ignore
        if (window && window.gtag) {
          // @ts-ignore
          window.gtag('event', 'conversion', {
            send_to: 'AW-435888795/MnPZCKuRpr8CEJvF7M8B',
            transaction_id: order.orderNumber,
            value: order.totalPrice / 100,
            currency: currentCurrency.label,
            tax,
            shipping: shippingPrice,
            items: order.items.map((item) => {
              const product = getProduct(item.productSku)

              return {
                id: item.productId,
                name: item.name,
                category: humanize(item.productCategory as string),
                price: product?.price || 0,
              }
            }),
          })
        }

        // @ts-ignore
        if (window && window.gtag) {
          // @ts-ignore
          window.gtag('event', 'purchase', {
            transaction_id: order.orderNumber,
            value: order.totalPrice / 100,
            currency: currentCurrency.label,
            tax,
            shipping: shippingPrice,
            items: order.items.map((item) => {
              const product = getProduct(item.productSku)

              return {
                id: item.productId,
                name: item.name,
                category: humanize(item.productCategory as string),
                price: product?.price || 0,
              }
            }),
          })
        }

        // @ts-ignore
        if (window && window.uetq) {
          // @ts-ignore
          window.uetq.push('event', 'purchase', {
            revenue_value: order.totalPrice / 100,
            currency: order.currency?.label || CurrencyType.Usd,
          })
          // @ts-ignore
          window.uetq.push('event', 'PRODUCT_PURCHASE', {
            ecomm_prodid: 'PHOTO',
            ecomm_pagetype: 'PURCHASE',
            revenue_value: order.totalPrice / 100,
            currency: order.currency?.label || CurrencyType.Usd,
          })
        }
        // @TODO: need Refactor
        setCookie(TEMP_ORDER_NUM, order.orderNumber, {
          path: '/',
        })

        setNewOrder(undefined)
        callback(true)
      }
    },
    [
      callback,
      clearCart,
      currentCurrency.label,
      getProduct,
      setCookie,
      shippingPrice,
      tax,
      updateMe,
    ],
  )

  const onSubmit = useCallback(async () => {
    const cardElement = stripeElements?.getElement(CardElement)
    if (!cardElement || !stripe) {
      callback(false)
      return
    }

    if (!cardName) {
      setError((errors) => ({
        ...errors,
        cardName: 'This field is required',
      }))
      return
    } else if (error.cardNumber) {
      callback(false)
      return
    }

    const order = await onCreateOrder()
    if (!order) {
      callback(false)
      return
    }

    const clientSecret = await getClientSecret(order)
    if (!clientSecret) {
      callback(false)
      return
    }

    setLoading(true)
    const { error: pError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: { name: cardName },
          metadata: { order_id: order.id },
        },
      },
    )
    setLoading(false)

    await finalizeResult(order, cardElement, pError, paymentIntent)

    if (paymentIntent?.status === 'requires_action') {
      stripe?.confirmCardPayment(clientSecret)
    }
  }, [
    stripeElements,
    stripe,
    cardName,
    error.cardNumber,
    onCreateOrder,
    getClientSecret,
    finalizeResult,
    callback,
  ])

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    if (!stripe || !stripeElements) {
      return
    }

    timer.current = setTimeout(() => {
      const pr = stripe.paymentRequest({
        currency: currentCurrency.label.toLowerCase(),
        country: country?.value || 'US',
        total: {
          label: '',
          amount: 100 * total,
        },
        requestPayerEmail: true,
        requestPayerName: true,
      })
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr)
        }
      })

      pr.on('paymentmethod', async ({ paymentMethod }) => {
        const order = await onCreateOrder()
        if (!order) {
          return
        }

        const clientSecret = await getClientSecret(order)
        if (!clientSecret) {
          return
        }

        setLoading(true)
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: paymentMethod.id,
          },
          {
            handleActions: false,
          },
        )
        setLoading(false)

        await finalizeResult(order, undefined, error, paymentIntent)

        if (paymentIntent?.status === 'requires_action') {
          stripe?.confirmCardPayment(clientSecret)
        }
      })
    }, 1500)

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [
    stripe,
    stripeElements,
    subTotal,
    shippingPrice,
    conciergePrice,
    onCreateOrder,
    getClientSecret,
    finalizeResult,
    total,
    tax,
    currentCurrency.symbol,
    currentCurrency.label,
    country,
  ])

  return {
    conciergePrice,
    shippingPrice,
    subTotal,
    total,
    tax,
    paymentRequest,
    error,
    cardName,
    payment,
    stripeFocus,
    loading,
    submitDisabled:
      !['initial', 'succeeded', 'error'].includes(payment.status) ||
      !stripe ||
      !cardName,
    onFocusStripe: (f: boolean) => setStripeFocus(f),
    onSetError: (e: ValidationError) => setError(e),
    onSubmit,
    onInputChange,
  }
}
