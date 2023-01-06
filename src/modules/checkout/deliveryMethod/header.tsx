import React from 'react'

import { ShippingType } from '@/apollo'
import { useAuth } from '@/hooks'

interface Props {
  shippingType: ShippingType
  onChangeShippingType: (s: ShippingType) => void
}

const Header: React.FC<Props> = ({ shippingType, onChangeShippingType }) => {
  const { me } = useAuth()

  return (
    <div className="switcher-box">
      <label>
        <input
          type="checkbox"
          checked={shippingType !== ShippingType.NoShipping}
          disabled={me?.country === 'CA'}
          onChange={(e) =>
            onChangeShippingType(
              e.target.checked
                ? ShippingType.From3To6
                : ShippingType.NoShipping,
            )
          }
        />
        <span className="box-wrap">
          <span className="option">Digital Photo (Only)</span>
          <span className="slider" />
          <span className="option">
            <b>Print & Ship Studio Service Cost</b>
            <div className="d-flex">
              Ship to My Address
              <span className="mx-1" style={{ color: `var(--jungle-green)` }}>
                (Recommended)
              </span>
            </div>
          </span>
        </span>
      </label>
    </div>
  )
}

export default Header
