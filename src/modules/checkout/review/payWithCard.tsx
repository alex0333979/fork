import React from 'react'
import classNames from 'classnames'

import { CardElement } from '@stripe/react-stripe-js'

import { ValidationError } from '@/types'

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

const PayWithCard: React.FC<Props> = ({
  error,
  cardName,
  stripeFocus,
  onChangeStripeFocus,
  onChangeError,
  onInputChange,
}) => (
  <div className="shipping-data">
    <ol>
      <li>
        <div className="name">
          <h3>Pay With Credit Card</h3>
        </div>
      </li>
      <li>
        <form>
          <div className="form-fields">
            <label className="full-size">
              <span className="label">Name on the card *</span>
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
              <span className="label">Card number</span>
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
