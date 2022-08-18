import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCurrency } from '@/hooks'

interface Props {
  subtotal: number
  total: number
}

const CheckoutTotalInfo: React.FC<Props> = ({ subtotal, total }) => {
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
