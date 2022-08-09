import React from 'react'

import { ShippingType } from '@/apollo'
import { useLocation } from '@/hooks'
import { shippingTypes } from '@/constants'
import DeliveryMethodItem from './methodItem'

interface Props {
  shippingType: ShippingType
  onChangeShippingType: (s: ShippingType) => void
}

const Methods: React.FC<Props> = ({ shippingType, onChangeShippingType }) => {
  const { country } = useLocation()
  return (
    <li>
      <div className="name">
        <h3>Delivery method</h3>
      </div>
      <div className="form-fields">
        {shippingTypes(country?.value).map((sType) => (
          <DeliveryMethodItem
            key={sType.productSku}
            selected={shippingType}
            shippingType={sType}
            onSelect={onChangeShippingType}
          />
        ))}
      </div>
    </li>
  )
}

export default Methods
