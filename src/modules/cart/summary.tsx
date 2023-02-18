import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dynamic'
import { PrismicRichText } from '@prismicio/react'

import { Product } from '@/apollo'
import { useProducts } from '@/hooks'
const LanguageCurrencySelector = dynamic(
  () => import('@/components/elements/languageCurrencySelector'),
  {
    ssr: false,
  },
)

import { SummaryProps } from './types'

const Summary: React.FC<SummaryProps> = ({
  cart,
  currency,
  onCheckout,
  page,
}) => {
  const { t } = useTranslation()
  const { getProduct } = useProducts()

  const subTotal = useMemo(
    () =>
      cart?.items
        ?.filter((i) => i.isComplete)
        .reduce((a, item) => {
          const product: Product | undefined = getProduct(item.productSku)
          return a + (product?.price || 0)
        }, 0),
    [cart?.items, getProduct],
  )

  return (
    <div className="item-wrap total-info">
      <div className="order-summary">
        <div className="summary-header">
          <PrismicRichText field={page?.data.summary_title} />
          <LanguageCurrencySelector wrapperClass="language-selector" />
        </div>
        <table>
          <tbody>
            <tr>
              <td>{page?.data.summary_subtotal[0].text}</td>
              <td>
                {t('currency', {
                  value: subTotal,
                  currency: currency.label,
                })}
              </td>
            </tr>
            <tr>
              <td>{page?.data.summary_tax[0].text}</td>
              <td>
                {t('currency', {
                  value: 0,
                  currency: currency.label,
                })}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <b>{page?.data.summary_total[0].text}</b>
              </td>
              <td>
                <b>
                  {t('currency', {
                    value: subTotal,
                    currency: currency.label,
                  })}
                </b>
              </td>
            </tr>
          </tfoot>
        </table>
        <button className="main-btn big" onClick={onCheckout}>
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Summary
