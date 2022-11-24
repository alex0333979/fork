import React, { useEffect, useCallback, useState } from 'react'
import { Bars } from 'react-loading-icons'

import { CouponType, useApplyCouponToCartMutation } from '@/apollo'
import { useAuth } from '@/hooks'

interface Props {
  cartCoupon?: CouponType | null
}

const ApplyCoupon: React.FC<Props> = ({ cartCoupon }) => {
  const { updateMe } = useAuth()

  const [coupon, setCoupon] = useState<string | undefined | null>()
  const [error, setError] = useState<string>('')

  const [applyCoupon, { loading }] = useApplyCouponToCartMutation()

  useEffect(() => {
    if (coupon === undefined) {
      setCoupon(cartCoupon)
    }
  }, [cartCoupon, coupon])

  const onApply = useCallback(() => {
    if (cartCoupon || !coupon) return
    if (!Object.values(CouponType).includes(coupon.trim() as CouponType)) {
      setError('Invalid coupon code')
      return
    }

    setError('')
    applyCoupon({
      variables: {
        coupon,
      },
      onCompleted: (res) => {
        if (res.ApplyCouponToCart.data) {
          updateMe({ cart: res.ApplyCouponToCart.data })
        }
        if (!res.ApplyCouponToCart.status) {
          setError(res.ApplyCouponToCart.message)
        }
      },
    })
  }, [cartCoupon, coupon, applyCoupon, updateMe])

  return (
    <div className="shipping-data">
      <div className="form-fields coupon-row">
        <label>
          <span className="field">
            <input
              type="text"
              name="coupon"
              value={coupon || ''}
              placeholder="Coupon code"
              disabled={!!cartCoupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
          </span>
          {error && <span className="attention">{error}</span>}
        </label>
        <div className="next-btn">
          <button
            type="button"
            className="main-btn big"
            disabled={!!cartCoupon || loading}
            onClick={onApply}>
            {loading ? (
              <Bars height={25} fill="#FFFFFF" stroke="transparent" />
            ) : (
              <span>{cartCoupon ? 'Applied' : 'Apply'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApplyCoupon
