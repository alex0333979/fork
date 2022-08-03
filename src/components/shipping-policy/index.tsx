import React from 'react'

const ShippingPolicy: React.FC = () => (
  <div className="cart-page">
    <div className="page-title">
      <div className="container">
        <div className="data-wrap">
          <h1>{`Shipping policy`}</h1>
        </div>
      </div>
    </div>

    <div className="terms-page">
      <div className="container">
        <div className="text-wrap">
          <p>
            Thank you for visiting PassportPhotos.com. Below are the terms and
            conditions that constitute our Shipping Policy.
            <br />
          </p>
          <h2>Standard Shipment Processing Time:</h2>
          <p>
            All orders are processed within 2-3 business days. Typically, orders
            are not shipped or delivered on weekends or holidays. If we are
            experiencing a high volume of orders, shipments may be delayed by a
            few days. Please allow additional days in transit for delivery. If
            there will be a significant delay in the shipment of your order, we
            will contact you via email or telephone.
          </p>
          <h2>Expedited Shipping Processing:</h2>
          <p>
            Shipment method Estimated delivery time Shipment cost
            <br />
            Three business days $12.95
            <br />
            Overnight * 1-2 business days $19.95
            <br />* Overnight delivery is only available for orders with
            delivery addresses within the continental United States.
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default ShippingPolicy
