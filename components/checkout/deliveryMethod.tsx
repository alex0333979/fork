/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import {
  ShippingType,
  ProductSku,
  useSetShippingTypeToCartMutation,
} from '@/generated/graphql'
import { useAuth } from '@/lib/auth'
import CheckoutLayout from '@/components/checkout/checkoutLayout'
import { useProducts, useCurrency } from '@/hooks/index'
import { PAGES, shippingTypes } from '../../constants'
import DeliveryMethodItem from './deliveryMethodItem'

const DeliveryMethod: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { getProduct } = useProducts()
  const { currentCurrency } = useCurrency()
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
    () => getProduct(ProductSku.PrintShipService),
    [getProduct],
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
              <span className="option">{'Digital Photo (Only)'}</span>
              <span className="slider" />
              <span className="option" data-status={'Recommended'}>
                <b>
                  {
                    'Print & Ship To My Address (Free Delivery)'
                  }
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
                      currency: printPrice?.currency.label,
                    })}
                  </b>
                </p>
              </div>
            </li>
            <li>
              <div className="name">
                {shippingType === ShippingType.NoShipping ? (
                  <h3>
                    <span>{'Digital Photo (Only) Includes:'}</span>
                  </h3>
                ) : (
                  <h3>{'Print & Ship Service Includes:'}</h3>
                )}
              </div>
              <div className="text">
                {shippingType === ShippingType.NoShipping ? (
                  <>
                    <ul className="checked">
                      <li>
                        {
                          'High resolution single photo in a JPG file format for official website submission'
                        }
                      </li>
                      <li>
                        {
                          'A "ready to print" high resolution template with all your photos for a local printer (store/home)'
                        }
                      </li>
                      <li>
                        {
                          'Additional photo expert Review to ensure biometric requirements'
                        }
                      </li>
                    </ul>
                    <ul style={{ paddingTop: 0 }}>
                      <li>
                        {
                          'Not Including printed photos on a premium glossy photo paper'
                        }
                      </li>
                    </ul>
                  </>
                ) : (
                  <ul className="checked">
                    <li>
                      {
                        'We print and ship your photos on a premium glossy photo paper (along with other official documents)'
                      }
                    </li>
                    <li>
                      {
                      '1 Digital photo for official website submission + a "ready to print" template to print at a local printer (store/home)'
                      }
                    </li>
                    <li>
                      {
                        'Additional photo expert Review to ensure biometric requirements'
                      }
                    </li>
                    <li>{'Free Delivery'}</li>
                  </ul>
                )}
              </div>
            </li>
            <li>
              <div className="name">
                <h3>{'Delivery method'}</h3>
              </div>
              <div className="form-fields">
                {shippingTypes(currentCurrency.code).map((sType) => (
                  <DeliveryMethodItem
                    key={sType.productSku}
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
