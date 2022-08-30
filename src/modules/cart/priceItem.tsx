import React from 'react'
import { useTranslation } from 'react-i18next'

import { Maybe, Product, ProductSku } from '@/apollo'

interface Props {
  product: Product
  selected: Maybe<ProductSku> | undefined
  onSelect: (product: Product) => void
}

const PriceItem: React.FC<Props> = ({ product, selected, onSelect }) => {
  const { t } = useTranslation()

  return (
    <label className="full-size">
      <span className="field radio with-price">
        <span className="name">{product.description}</span>
        <span className="price">
          {t('currency', {
            value: product.price,
            currency: product.currency.label,
          })}
        </span>
        <input
          type="radio"
          checked={product.sku === selected}
          onChange={() => onSelect(product)}
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
