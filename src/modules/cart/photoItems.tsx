import React from 'react'

import ShoppingCartItem from './cartItem'

import { PhotoItemsProps } from './types'

const PhotoItems: React.FC<PhotoItemsProps> = ({
  items,
  currency,
  onRemoveItem,
  onUpdated,
  onPreview,
}) => {
  if (!items.length) return null

  return (
    <div className="item-wrap">
      <ul>
        {items.map((item, index) => (
          <ShoppingCartItem
            key={`photo-${index}`}
            currency={currency}
            item={item}
            onDelete={onRemoveItem}
            onUpdated={onUpdated}
            onPreview={onPreview}
          />
        ))}
      </ul>
    </div>
  )
}

export default PhotoItems
