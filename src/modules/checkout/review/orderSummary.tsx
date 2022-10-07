/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Currency, ProductCategory, ProductSku } from '@/apollo'
import { useAuth, useProducts } from '@/hooks'

interface Props {
  currency: Currency
  conciergePrice: number
  shippingPrice: number
  subTotal: number
  total: number
  tax: number
}

const OrderSummary: React.FC<Props> = ({
  currency,
  conciergePrice,
  shippingPrice,
  subTotal,
  total,
  tax,
}) => {
  const { t } = useTranslation()
  const { cart } = useAuth()
  const { getProduct } = useProducts()

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

  const aCount = useMemo(
    () =>
      cart?.items?.filter(
        (c) =>
          c.productCategory === ProductCategory.Application && c.isComplete,
      ).length ?? 0,
    [cart?.items],
  )

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

  return (
    <div className="shipping-data">
      <ol>
        <li>
          <div className="name">
            <h3>Order summary</h3>
          </div>
        </li>
        <li>
          {aCount > 0 && (
            <div className="name">
              <h3>{`${aCount} Passport Application`}</h3>
              <p>
                {t('currency', {
                  value: aPrice || 0,
                  currency: currency.label,
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
                  currency: currency.label,
                })}
              </p>
            </div>
          ))}
        </li>
        <li>
          <div className="name">
            <h3>Print & Ship Service</h3>
            <p>
              {t('currency', {
                value: conciergePrice,
                currency: currency.label,
              })}
            </p>
          </div>
          <div className="name">
            <h3>Shipping</h3>
            <p>
              {t('currency', {
                value: shippingPrice || 0,
                currency: currency.label,
              })}
            </p>
          </div>
          <div className="name">
            <h3>Subtotal Cost</h3>
            <p>
              {t('currency', {
                value: subTotal,
                currency: currency.label,
              })}
            </p>
          </div>
          {cart?.billingAddress?.state === 'NY' ? (
            <div className="name">
              <h3>Sales tax</h3>
              <p>
                {t('currency', {
                  value: tax,
                  currency: currency.label,
                })}
              </p>
            </div>
          ) : (
            <div className="name">
              <h3>Tax</h3>
              <p>
                {t('currency', {
                  value: 0,
                  currency: currency.label,
                })}
              </p>
            </div>
          )}
        </li>
        <li>
          <div className="name">
            <h3>Grand Total</h3>
            <p>
              {t('currency', {
                value: total,
                currency: currency.label,
              })}
            </p>
          </div>
        </li>
      </ol>
    </div>
  )
}

export default OrderSummary
