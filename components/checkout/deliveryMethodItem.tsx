/* eslint-disable max-len */
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ShippingType, CartPriceType } from '@/generated/graphql'
import { usePrices } from '@/hooks/index'

interface Props {
  selected: string
  shippingType: {
    title: string
    priceId: CartPriceType
    value: ShippingType
  }
  onSelect: (v: string) => void
}

const DeliveryMethodItem: React.FC<Props> = ({
  selected,
  shippingType,
  onSelect,
}) => {
  const { t } = useTranslation()
  const { prices } = usePrices()

  const price = useMemo(
    () => prices.find((p) => p.priceId === shippingType.priceId),
    [prices, shippingType.priceId],
  )

  if (!price) return null

  return (
    <label className="full-size">
      <span className="field radio with-price">
        <span className="name">{shippingType.title}</span>
        <span className="price">
          {price.price > 0
            ? `+${t('currency', {
                value: price.price,
                currency: price.currency,
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
