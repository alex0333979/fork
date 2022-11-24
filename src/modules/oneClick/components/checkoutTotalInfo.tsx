import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCurrency } from '@/hooks'

interface Props {
  subtotal: number
  discount: number
  total: number
}

const CheckoutTotalInfo: React.FC<Props> = ({ subtotal, discount, total }) => {
  const { t } = useTranslation()
  const { currentCurrency } = useCurrency()

  return (
    <div className="total-info">
      <table>
        <tbody>
          <tr>
            <td>Subtotal:</td>
            <td>
              {t('currency', {
                value: subtotal,
                currency: currentCurrency.label,
              })}
            </td>
          </tr>
          {discount > 0 && (
            <tr className="discount-value">
              <td>Discount:</td>
              <td>
                {t('currency', {
                  value: -discount,
                  currency: currentCurrency.label,
                })}
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td>Total:</td>
            <td>
              <span>
                {t('currency', {
                  value: total,
                  currency: currentCurrency.label,
                })}
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default CheckoutTotalInfo
