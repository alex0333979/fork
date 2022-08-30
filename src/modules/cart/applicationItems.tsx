import React from 'react'

import ShoppingCartItem from './cartItem'

import AddAnotherButton from './addAnotherButton'
import { ApplicationItemsProps } from './types'

const ApplicationItems: React.FC<ApplicationItemsProps> = ({
  items,
  photoItems,
  currency,
  onRemoveItem,
  onUpdated,
  onPreview,
  onAddAnother,
}) => {
  if (!items.length) return null

  return (
    <div className="item-wrap">
      <ul>
        {items.map((item, index) => (
          <ShoppingCartItem
            key={`application-${index}`}
            item={item}
            currency={currency}
            onDelete={onRemoveItem}
            onUpdated={onUpdated}
            onPreview={onPreview}
          />
        ))}
      </ul>
      {photoItems.length > 0 && (
        <AddAnotherButton onAddAnother={onAddAnother} />
      )}
    </div>
  )
}

export default ApplicationItems
