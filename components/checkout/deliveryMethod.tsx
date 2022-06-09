/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import {
  ShippingType,
  useSetShippingTypeToCartMutation,
  CartPriceType,
} from '@/generated/graphql'
import { useAuth } from '@/lib/auth'
import CheckoutLayout from '@/components/checkout/checkoutLayout'
import { usePrices } from '@/hooks/index'
import { PAGES, SHIPPING_TYPES } from '../../constants'
import DeliveryMethodItem from './deliveryMethodItem'

const DeliveryMethod: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { prices } = usePrices()
  const { cart, updateCart } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [shippingType, setShippingType] = useState<string>(
    cart?.shippingType ?? ShippingType.From3To6,
  )
  const [setShippingTypeToCart] = useSetShippingTypeToCartMutation()

  useEffect(() => {
    setShippingType(cart?.shippingType ?? ShippingType.From3To6)
  }, [cart])

  const onSubmit = useCallback(async () => {
    setLoading(true)
    const { data } = await setShippingTypeToCart({
      variables: { shippingType },
    })
    setLoading(false)
    const cart = data?.SetShippingTypeToCart.data
    if (cart) {
      updateCart(cart)
      if (cart.shippingType === ShippingType.NoShipping) {
        await router.push(PAGES.checkout.payment)
      } else {
        await router.push(PAGES.checkout.shipping)
      }
    }
  }, [router, setShippingTypeToCart, shippingType, updateCart])

  const printPrice = useMemo(
    () =>
      prices.find(
        (_price) => _price.priceId === CartPriceType.PrintShipService,
      ),
    [prices],
  )

  const subTotal = useMemo(
    () =>
      shippingType === ShippingType.NoShipping ? 0 : printPrice?.price || 0,
    [printPrice?.price, shippingType],
  )

  return (
    <CheckoutLayout
      step={1}
      loading={loading}
      backLink={PAGES.cart}
      onSubmit={onSubmit}
      completeStep={0}>
      <div className="form-wrap">
        <div className="switcher-box">
          <label>
            <input
              type="checkbox"
              checked={shippingType !== ShippingType.NoShipping}
              onChange={(e) =>
                setShippingType(
                  e.target.checked
                    ? ShippingType.From3To6
                    : ShippingType.NoShipping,
                )
              }
            />
            <span className="box-wrap">
              <span className="option">{'Print at home'}</span>
              <span className="slider" />
              <span className="option" data-status={'Recommended'}>
                <b>
                  {`Add concierge service for just ${t('currency', {
                    value: printPrice?.price || 0,
                    currency: printPrice?.currency,
                  })}!`}{' '}
                </b>
              </span>
            </span>
          </label>
        </div>
        <div className="shipping-data">
          <ol>
            <li>
              <div className="name">
                <h3>{'Subtotal'}</h3>
                <p>
                  {'Just '}
                  <b>
                    {t('currency', {
                      value: subTotal,
                      currency: printPrice?.currency,
                    })}
                  </b>
                </p>
              </div>
            </li>
            <li>
              <div className="name">
                {shippingType === ShippingType.NoShipping ? (
                  <h3>
                    <span>{'Print at home option Includes:'}</span>
                  </h3>
                ) : (
                  <h3>{'Included:'}</h3>
                )}
              </div>
              <div className="text">
                {shippingType === ShippingType.NoShipping ? (
                  <>
                    <ul className="checked">
                      <li>{'Digital Photos in a JPG  file'}</li>
                      <li>
                        {
                          'Digital Photos File to Print at home (or) send to print at CVS/Walgreens '
                        }
                      </li>
                    </ul>
                    <ul style={{ paddingTop: 0 }}>
                      <li>
                        {
                          'Not including printed photos on the required 4”X6” glossy photo paper.'
                        }
                      </li>
                    </ul>
                  </>
                ) : (
                  <ul className="checked">
                    <li>
                      {
                        'We will print and ship your documents - including your photos on the required 4”X6” glossy photo paper.'
                      }
                    </li>
                    <li>{'4 Photos Per Person'}</li>
                    <li>{'Processing Instructions Guide'}</li>
                  </ul>
                )}
              </div>
            </li>
            <li>
              <div className="name">
                <h3>{'Delivery method'}</h3>
              </div>
              <div className="form-fields">
                {SHIPPING_TYPES.map((sType) => (
                  <DeliveryMethodItem
                    key={sType.priceId}
                    selected={shippingType}
                    shippingType={sType}
                    onSelect={setShippingType}
                  />
                ))}
              </div>
            </li>
          </ol>
        </div>
      </div>
    </CheckoutLayout>
  )
}

export default DeliveryMethod
