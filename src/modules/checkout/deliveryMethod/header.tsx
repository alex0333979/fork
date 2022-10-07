import React from 'react'

import { ShippingType } from '@/apollo'

interface Props {
  shippingType: ShippingType
  onChangeShippingType: (s: ShippingType) => void
}

const Header: React.FC<Props> = ({ shippingType, onChangeShippingType }) => (
  <div className="switcher-box">
    <label>
      <input
        type="checkbox"
        checked={shippingType !== ShippingType.NoShipping}
        onChange={(e) =>
          onChangeShippingType(
            e.target.checked ? ShippingType.From3To6 : ShippingType.NoShipping,
          )
        }
      />
      <span className="box-wrap">
        <span className="option">Digital Photo (Only)</span>
        <span className="slider" />
        <span className="option" data-status="Recommended">
          <b>Print & Ship To My Address</b>
        </span>
      </span>
    </label>
  </div>
)

export default Header
