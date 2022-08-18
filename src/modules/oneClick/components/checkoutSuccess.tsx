import React from 'react'

interface Props {
  onClose: () => void
}

const CheckoutSuccess: React.FC<Props> = ({ onClose }) => (
  <div className="success-content">
    <div className="img-wrap">
      <img src="/images/done.png" alt="" />
    </div>
    <div className="sub-title">
      <h3>Thank you</h3>
      <p>Transaction completed successfully.</p>
    </div>
    <div className="btn-wrap">
      <button type="button" className="main-btn big" onClick={onClose}>
        Close
      </button>
    </div>
  </div>
)

export default CheckoutSuccess
