import React from 'react'

interface Props {
  status: string
  error?: string
}

const PaymentStatus: React.FC<Props> = ({ status, error }) => {
  if (
    ['processing', 'requires_payment_method', 'requires_confirmation'].includes(
      status,
    )
  ) {
    return (
      <div className="form-fields">
        <div className="form-notice">
          <p>
            Processing...
            <span className="icon-info" />
          </p>
        </div>
      </div>
    )
  }

  if (status === 'requires_action') {
    return (
      <div className="form-fields">
        <div className="form-notice">
          <p>
            Authenticating...
            <span className="icon-info" />
          </p>
        </div>
      </div>
    )
  }

  if (status === 'succeeded') {
    return (
      <div className="form-fields">
        <div className="form-notice">
          <p>
            {'Payment succeeded'}
            <span className="icon-info" />
          </p>
        </div>
      </div>
    )
  }

  if (status === 'error' && !!error) {
    return (
      <div className="form-fields">
        <div className="form-notice">
          <p>
            {error}
            <span className="icon-info" />
          </p>
        </div>
      </div>
    )
  }

  return null
}

export default PaymentStatus
