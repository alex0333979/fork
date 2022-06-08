import React from 'react'
import { useTranslation } from 'react-i18next'

import { CartPrice } from '@/generated/graphql'

interface Props {
  price: CartPrice
  selected: number
  onSelect: (price: CartPrice) => void
}

const PriceItem: React.FC<Props> = ({ price, selected, onSelect }) => {
  const { t } = useTranslation()

  return (
    <label className="full-size">
      <span className="field radio with-price">
        <span className="name">{price.description}</span>
        <span className="price">
          {t('currency', { value: price.price, currency: price.currency })}
        </span>
        <input
          type="radio"
          checked={price.price === selected}
          onChange={() => onSelect(price)}
        />
        <span className="wrap">
          <span className="bullet" />
          <span className="border" />
        </span>
      </span>
    </label>
  )
}

export default PriceItem
