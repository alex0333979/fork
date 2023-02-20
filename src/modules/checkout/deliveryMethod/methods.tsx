import React from 'react'
import { PrismicRichText } from '@prismicio/react'

import { ShippingType } from '@/apollo'
import { useLocation } from '@/hooks'
import { shippingTypes } from '@/constants'
import DeliveryMethodItem from './methodItem'

interface Props {
  shippingType: ShippingType
  onChangeShippingType: (s: ShippingType) => void
  slice?: any
}

const Methods: React.FC<Props> = ({
  shippingType,
  onChangeShippingType,
  slice,
}) => {
  const { country } = useLocation()

  return (
    <li>
      <div className="name prismic-content">
        <PrismicRichText field={slice?.primary.step_name} />
      </div>
      <div className="form-fields">
        {shippingTypes(country?.value).map((sType, index) => (
          <DeliveryMethodItem
            key={sType.productSku}
            selected={shippingType}
            shippingType={sType}
            onSelect={onChangeShippingType}
            prismicShippingTitle={slice?.items[index].method_option[0].text}
          />
        ))}
      </div>
    </li>
  )
}

export default Methods
