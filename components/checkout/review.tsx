/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import classNames from 'classnames'
import { humanize } from '@/lib/utils/string'
import {
  PaymentIntent,
  StripeCardElement,
  StripeError,
} from '@stripe/stripe-js'
import {
  CardElement,
  PaymentRequestButtonElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import CheckoutLayout from '@/components/checkout/checkoutLayout'
import { useAuth } from '@/lib/auth'
import {
  CurrencyType,
  Order,
  ProductCategory,
  ProductSku,
  ShippingType,
  useClearCartMutation,
  useCreateOrderMutation,
  useGetPaymentIntentMutation,
} from '@/generated/graphql'
import { ValidationError } from '@/lib/utils/formValidation'
import { showError, showSuccess } from '@/lib/utils/toast'
import { TEMP_ORDER_NUM } from '@/lib/apolloClient'
import { useProducts, useCurrency, useLocation } from '@/hooks/index'
import { PAGES, shippingTypes } from '../../constants'

const CARD_OPTIONS = {
  iconStyle: 'solid' as const,
  style: {
    base: {
      border: 'solid 1px grey',
      iconColor: '#5b616e',
      color: '#000000',
      fontWeight: 'normal',
      fontSize: '14px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#5b616e',
      },
    },
    invalid: {
      iconColor: '#ef2961',
      color: '#ef2961',
    },
  },
}

const ReviewAndPay: React.FC = () => {
  const { t } = useTranslation()
  const { getProduct } = useProducts()
  const [, setCookie] = useCookies([TEMP_ORDER_NUM])
  const { cart, updateCart } = useAuth()
  const { currentCurrency } = useCurrency()
  const { country } = useLocation()
  const [cardName, setCardName] = useState<string>('')
  const [error, setError] = useState<ValidationError>({})
  const [stripeFocus, setStripeFocus] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [payment, setPayment] = useState({ status: 'initial' })
  const [createOrder] = useCreateOrderMutation()
  const [getPaymentIntent] = useGetPaymentIntentMutation()
  const [clearCart] = useClearCartMutation()
  const [paymentRequest, setPaymentRequest] = useState<any>(null)
  const router = useRouter()
  const timer = useRef<NodeJS.Timeout | null>()

  const stripe = useStripe()
  const elements = useElements()

  const shippingPrice = useMemo(() => {
    const productSku = shippingTypes(currentCurrency.code).find(
      (s) => s.value === cart?.shippingType,
    )?.productSku

    if (!productSku) return 0

    return getProduct(productSku)?.price || 0
  }, [cart?.shippingType, currentCurrency.code, getProduct])

  const aPrice = useMemo(
    () =>
      cart?.items
        ?.filter(
          (c) =>
            c.productCategory === ProductCategory.Application && c.isComplete,
        )
        .reduce((a, item) => {
          const product = getProduct(item.productSku)
          return a + (product?.price || 0)
        }, 0),
    [cart?.items, getProduct],
  )

  const aCount = useMemo(
    () =>
      cart?.items?.filter(
        (c) =>
          c.productCategory === ProductCategory.Application && c.isComplete,
      ).length ?? 0,
    [cart?.items],
  )

  const photoItems = useMemo(
    () =>
      cart?.items
        ?.filter((c) => c.productCategory === ProductCategory.Photo)
        ?.map(({ productSku, description }) => {
          const product = getProduct(productSku)
          let text = ''
          if (productSku === ProductSku.TwoPhotos) {
            text = `2 ${description}`
          } else if (productSku === ProductSku.FourPhotos) {
            text = `4 ${description}`
          } else if (productSku === ProductSku.SixPhotos) {
            text = `6 ${description}`
          } else {
            text = 'Photos'
          }
          return {
            text,
            price: product?.price || 0,
          }
        }) ?? [],
    [cart?.items, getProduct],
  )

  const conciergePrice = useMemo(() => {
    if (cart?.shippingType === ShippingType.NoShipping) return 0
    const product = getProduct(ProductSku.PrintShipService)

    return product?.price || 0
  }, [cart?.shippingType, getProduct])

  const subTotal = useMemo(
    () =>
      (cart?.items
        ?.filter((i) => i.isComplete)
        .reduce((a, { productSku }) => {
          const product = getProduct(productSku)
          return a + (product?.price || 0)
        }, 0) ?? 0) +
      conciergePrice +
      shippingPrice,
    [cart?.items, conciergePrice, getProduct, shippingPrice],
  )

  const tax = useMemo(() => {
    if (cart?.billingAddress?.state === 'NY') {
      return parseFloat((subTotal * 0.08875).toFixed(2))
    }
    return 0
  }, [cart?.billingAddress?.state, subTotal])

  const total = useMemo(() => subTotal + tax, [tax, subTotal])

  const handleInputChange = useCallback((e) => {
    setError((errors) => ({
      ...errors,
      cardName: '',
    }))
    setCardName(e.target.value)
  }, [])

  const onCreateOrder = useCallback(async (): Promise<Order | undefined> => {
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
    return order
  }, [createOrder])

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
      } else if (paymentIntent) {
        showSuccess('Payment is done successfully.')
        setPayment(paymentIntent)
        const { data } = await clearCart({})
        const cart = data?.ClearCart.data
        if (cart) {
          updateCart(cart)
        }

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

        // @ts-ignore
        if (window && window.woopra) {
          // @ts-ignore
          window.woopra.track('checkout', {
            total_items: order.items.length,
            discount_amount: 0,
            tax_amount: tax,
            shipping_amount: shippingPrice,
            total_amount: order.totalPrice / 100,
            order_id: order.orderNumber,
          })
        }

        // @ts-ignore
        if (window && window.uetq) {
          // @ts-ignore
          window.uetq.push('event', 'purchase', {
            revenue_value: order.totalPrice / 100,
            currency: order.currency?.label || CurrencyType.Usd,
          })
        }

        // bing
        // ..
        setCookie(TEMP_ORDER_NUM, order.orderNumber, {
          path: '/',
        })
        await router.push(PAGES.checkout.thankYou)
      }
    },
    [
      clearCart,
      currentCurrency.label,
      getProduct,
      router,
      setCookie,
      shippingPrice,
      tax,
      updateCart,
    ],
  )

  const onSubmit = useCallback(async () => {
    const cardElement = elements?.getElement(CardElement)
    if (!cardElement || !stripe) {
      return
    }

    if (!cardName) {
      setError((errors) => ({
        ...errors,
        cardName: 'This field is required',
      }))
      return
    } else if (error.cardNumber) {
      return
    }

    const order = await onCreateOrder()
    if (!order) {
      return
    }

    const clientSecret = await getClientSecret(order)
    if (!clientSecret) {
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
    cardName,
    elements,
    error.cardNumber,
    finalizeResult,
    getClientSecret,
    onCreateOrder,
    stripe,
  ])

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    if (!stripe || !elements) {
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
    elements,
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

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case 'processing':
      case 'requires_payment_method':
      case 'requires_confirmation':
        return (
          <div className="form-fields">
            <div className="form-notice">
              <p>
                {'Processing...'}
                <span className="icon-info" />
              </p>
            </div>
          </div>
        )

      case 'requires_action':
        return (
          <div className="form-fields">
            <div className="form-notice">
              <p>
                {'Authenticating...'}
                <span className="icon-info" />
              </p>
            </div>
          </div>
        )

      case 'succeeded':
        return (
          <div className="form-fields">
            <div className="form-notice">
              <p>
                {'Payment succeeded'}
                <span className="icon-info" />
              </p>
            </div>
          </div>
        )

      case 'error':
        return (
          <div className="form-fields">
            <div className="form-notice">
              <p>
                {error.result}
                <span className="icon-info" />
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <CheckoutLayout
      step={4}
      loading={loading}
      backLink={PAGES.checkout.payment}
      nextButtonText={'Check out'}
      disableSubmit={
        !['initial', 'succeeded', 'error'].includes(payment.status) || !stripe
      }
      onSubmit={onSubmit}
      completeStep={3}>
      <div className="form-wrap">
        <PaymentStatus status={payment.status} />
        <div className="form-fields">
          <div className="extra-info">
            <h3>{'Review and Pay'}</h3>
          </div>
        </div>
        <div className="shipping-data">
          <ol>
            <li>
              <div className="name">
                <h3>{'Order summery'}</h3>
              </div>
            </li>
            <li>
              {aCount > 0 && (
                <div className="name">
                  <h3>{`${aCount} Passport Application`}</h3>
                  <p>
                    {t('currency', {
                      value: aPrice || 0,
                      currency: currentCurrency.label,
                    })}
                  </p>
                </div>
              )}
              {photoItems.map((item, index) => (
                <div key={index} className="name">
                  <h3>{item.text}</h3>
                  <p>
                    {t('currency', {
                      value: item.price,
                      currency: currentCurrency.label,
                    })}
                  </p>
                </div>
              ))}
            </li>
            <li>
              <div className="name">
                <h3>{'Concierge service'}</h3>
                <p>
                  {t('currency', {
                    value: conciergePrice,
                    currency: currentCurrency.label,
                  })}
                </p>
              </div>
              <div className="name">
                <h3>{'Shipping'}</h3>
                <p>
                  {t('currency', {
                    value: shippingPrice || 0,
                    currency: currentCurrency.label,
                  })}
                </p>
              </div>
              <div className="name">
                <h3>{'SubTotal'}</h3>
                <p>
                  {t('currency', {
                    value: subTotal,
                    currency: currentCurrency.label,
                  })}
                </p>
              </div>
              {cart?.billingAddress?.state === 'NY' ? (
                <div className="name">
                  <h3>{'Sales tax'}</h3>
                  <p>
                    {t('currency', {
                      value: tax,
                      currency: currentCurrency.label,
                    })}
                  </p>
                </div>
              ) : (
                <div className="name">
                  <h3>{'Tax'}</h3>
                  <p>
                    {t('currency', {
                      value: 0,
                      currency: currentCurrency.label,
                    })}
                  </p>
                </div>
              )}
            </li>
            <li>
              <div className="name">
                <h3>{'Grand Total'}</h3>
                <p>
                  {t('currency', {
                    value: total,
                    currency: currentCurrency.label,
                  })}
                </p>
              </div>
            </li>
          </ol>
        </div>
        {paymentRequest && (
          <>
            <div className="shipping-data">
              <ol>
                <li>
                  <form>
                    <div className="form-fields">
                      <label className="full-size">
                        <span className="field">
                          <PaymentRequestButtonElement
                            options={{ paymentRequest }}
                          />
                        </span>
                      </label>
                    </div>
                  </form>
                </li>
              </ol>
            </div>
            <p className="separator"> - OR - </p>
          </>
        )}
        <div className="shipping-data">
          <ol>
            <li>
              <div className="name">
                <h3>{'Pay With Credit Card'}</h3>
              </div>
            </li>
            <li>
              <form>
                <div className="form-fields">
                  <label className="full-size">
                    <span className="label">{'Name on the card *'}</span>
                    <span className="field">
                      <input
                        type="text"
                        className={classNames({
                          'error-border': !!error.cardName,
                        })}
                        name="cardName"
                        placeholder="Name on the card"
                        value={cardName}
                        onChange={handleInputChange}
                      />
                    </span>
                    {error.cardName ? (
                      <span className="attention">{error.cardName}</span>
                    ) : (
                      <></>
                    )}
                  </label>
                  <label className="full-size">
                    <span className="label">{'Card number'}</span>
                    <span className="field">
                      <span
                        className={classNames('stripe-input', {
                          focus: stripeFocus,
                          'error-border': !!error.cardNumber,
                        })}>
                        <CardElement
                          options={CARD_OPTIONS}
                          onFocus={() => setStripeFocus(true)}
                          onBlur={() => setStripeFocus(false)}
                          onChange={(e) => {
                            setError({})
                            if (e.error) {
                              setError((errors) => ({
                                ...errors,
                                cardNumber:
                                  e.error?.message ??
                                  'An unknown error occurred',
                              }))
                            }
                          }}
                        />
                      </span>
                    </span>
                    {error.cardNumber ? (
                      <span className="attention">{error.cardNumber}</span>
                    ) : (
                      <></>
                    )}
                  </label>
                </div>
              </form>
            </li>
          </ol>
        </div>
      </div>
    </CheckoutLayout>
  )
}

export default ReviewAndPay
