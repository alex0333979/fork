import React from 'react'
import { PaymentRequestButtonElement } from '@stripe/react-stripe-js'

interface Props {
  paymentRequest: any
}

const PaymentButtons: React.FC<Props> = ({ paymentRequest }) => (
  <>
    <div className="shipping-data">
      <ol>
        <li>
          <form>
            <div className="form-fields">
              <label className="full-size">
                <span className="field">
                  <PaymentRequestButtonElement options={{ paymentRequest }} />
                </span>
              </label>
            </div>
          </form>
        </li>
      </ol>
    </div>
    <p className="separator"> - OR - </p>
  </>
)

export default PaymentButtons
