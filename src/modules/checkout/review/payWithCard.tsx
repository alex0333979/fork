import React from 'react'
import classNames from 'classnames'
import { PrismicRichText } from '@prismicio/react'

import { CardElement } from '@stripe/react-stripe-js'

import { ValidationError } from '@/types'
import { CheckoutSlice } from '@/pages/checkout/delivery-method'

interface Props {
  error: ValidationError
  cardName: string
  stripeFocus: boolean
  onChangeStripeFocus: (f: boolean) => void
  onChangeError: (e: ValidationError) => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CARD_OPTIONS = {
  iconStyle: 'solid' as const,
  style: {
    base: {
      border: 'solid 1px grey',
      iconColor: '#5b616e',
      color: '#000000',
      fontWeight: 'normal',
      fontSize: '14px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#5b616e',
      },
    },
    invalid: {
      iconColor: '#ef2961',
      color: '#ef2961',
    },
  },
}

const PayWithCard: React.FC<Props & CheckoutSlice> = ({
  error,
  cardName,
  stripeFocus,
  onChangeStripeFocus,
  onChangeError,
  onInputChange,
  slice,
}) => (
  <div className="shipping-data">
    <ol>
      <li>
        <div className="name">
          <PrismicRichText field={slice?.primary.pay_title} />
        </div>
      </li>
      <li>
        <form>
          <div className="form-fields">
            <label className="full-size">
              <span className="label">
                {slice?.primary.name_on_the_card[0].text}
              </span>
              <span className="field">
                <input
                  type="text"
                  className={classNames({
                    'error-border': !!error.cardName,
                  })}
                  name="cardName"
                  placeholder="Name on the card"
                  value={cardName}
                  onChange={onInputChange}
                />
              </span>
              {!!error.cardName && (
                <span className="attention">{error.cardName}</span>
              )}
            </label>
            <label className="full-size">
              <span className="label">
                {slice?.primary.card_number[0].text}
              </span>
              <span className="field">
                <span
                  className={classNames('stripe-input', {
                    focus: stripeFocus,
                    'error-border': !!error.cardNumber,
                  })}>
                  <CardElement
                    options={CARD_OPTIONS}
                    onFocus={() => onChangeStripeFocus(true)}
                    onBlur={() => onChangeStripeFocus(false)}
                    onChange={(e) => {
                      onChangeError({})
                      if (e.error) {
                        onChangeError({
                          ...error,
                          cardNumber:
                            e.error?.message ?? 'An unknown error occurred',
                        })
                      }
                    }}
                  />
                </span>
              </span>
              {!!error.cardNumber && (
                <span className="attention">{error.cardNumber}</span>
              )}
            </label>
          </div>
        </form>
      </li>
    </ol>
  </div>
)

export default PayWithCard
