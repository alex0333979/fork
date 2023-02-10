/* eslint-disable max-len */
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ShippingType, ProductSku } from '@/apollo'
import { useProducts } from '@/hooks'

interface Props {
  selected: string
  shippingType: {
    title: string
    productSku: ProductSku
    value: ShippingType
  }
  onSelect: (v: ShippingType) => void
  prismicShippingTitle: string
}

const DeliveryMethodItem: React.FC<Props> = ({
  selected,
  shippingType,
  onSelect,
  prismicShippingTitle,
}) => {
  const { t } = useTranslation()
  const { getProduct } = useProducts()

  const price = useMemo(
    () => getProduct(shippingType.productSku),
    [getProduct, shippingType.productSku],
  )

  if (!price) return null

  return (
    <label className="full-size">
      <span className="field radio with-price">
        <span className="name">{prismicShippingTitle}</span>
        <span className="price">
          {price.price > 0
            ? `+${t('currency', {
                value: price?.price || 0,
                currency: price?.currency.label,
              })}`
            : 'FREE'}
        </span>
        <input
          type="radio"
          name="delivery"
          checked={selected === shippingType.value}
          placeholder="delivery"
          onChange={() => onSelect(shippingType.value)}
        />
        <span className="wrap">
          <span className="bullet" />
          <span className="border" />
        </span>
      </span>
    </label>
  )
}

export default DeliveryMethodItem
