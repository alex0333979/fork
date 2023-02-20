import React from 'react'

import ShoppingCartItem from './cartItem'

import { PhotoItemsProps } from './types'

interface PreviewProps {
  previewButton?: string
}

const PhotoItems: React.FC<PhotoItemsProps & PreviewProps> = ({
  items,
  currency,
  onRemoveItem,
  onUpdated,
  onPreview,
  previewButton,
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
            previewButton={previewButton}
          />
        ))}
      </ul>
    </div>
  )
}

export default PhotoItems
