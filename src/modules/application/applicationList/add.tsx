import React, { useMemo } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { Product } from '@/apollo'
import { useAuth, useProducts, useCurrency } from '@/hooks'
import { AddProps } from './types'

const Add: React.FC<AddProps> = ({ isOpenAddFrom, openAddForm, onCreate }) => {
  const { t } = useTranslation()
  const { cart } = useAuth()
  const { currentCurrency } = useCurrency()

  const { getProduct } = useProducts()

  const subTotal = useMemo(
    () =>
      cart?.items?.reduce((a, item) => {
        const product: Product | undefined = getProduct(item.productSku)
        return a + (product?.price || 0)
      }, 0),
    [cart?.items, getProduct],
  )

  return (
    <li
      className={classNames({
        'add-application': true,
        active: isOpenAddFrom,
      })}>
      <button
        type="button"
        className="add-btn"
        onClick={() => openAddForm(!isOpenAddFrom)}>
        <span className="icon-close" />
        Add application
      </button>

      <div className="add-form">
        <div className="bg-wrap">
          <button
            type="button"
            className="icon-close"
            onClick={() => openAddForm(false)}
          />
          <div className="top-info">
            <h4>Add Another Application?</h4>
          </div>
          <table>
            <tbody>
              <tr>
                <td>Your new package price:</td>
                <td>
                  {t('currency', {
                    value: (subTotal || 0) / 100,
                    currency: currentCurrency.label,
                  })}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                  {`Total: ${t('number', {
                    value: cart?.items?.length || 0,
                  })}`}
                </td>
                <td>
                  <span>
                    {t('currency', {
                      value: (subTotal || 0) / 100,
                      currency: currentCurrency.label,
                    })}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="btn-wrap">
            <button className="main-btn small" onClick={onCreate}>
              Add an application
            </button>
            <button
              type="button"
              className="main-btn small blank cancel"
              onClick={() => openAddForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default Add
