import React from 'react'

const CheckoutForm: React.FC = () => {
  console.log('here')

  return (
    <div className="steps-page">
      <div className="steps-content">
        <div className="step-data">
          <div className="data-wrap">
            <div className="progress-wrap">
              <ul>
                <li className="done">
                  <div className="counter">
                    <span className="line">
                      {/* for progress change stroke-dasharray="0%,1000" to stroke-dasharray="295%,1000" */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48">
                        <circle
                          cx="24"
                          cy="24"
                          r="22.5"
                          fill="transparent"
                          strokeWidth="3"
                          strokeDasharray="295%,1000"
                          strokeDashoffset="0"
                        />
                      </svg>
                    </span>
                    <span className="index"></span>
                  </div>
                  <div className="name">
                    <h4>Select type</h4>
                  </div>
                </li>
                <li className="current">
                  <div className="counter">
                    <span className="line">
                      {/* for progress change stroke-dasharray="0%,1000" to stroke-dasharray="295%,1000" */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48">
                        <circle
                          cx="24"
                          cy="24"
                          r="22.5"
                          fill="transparent"
                          strokeWidth="3"
                          strokeDasharray="25%,1000"
                          strokeDashoffset="0"
                        />
                      </svg>
                    </span>
                    <span className="index"></span>
                  </div>
                  <div className="name">
                    <h4>Photo processing</h4>
                  </div>
                </li>
                <li>
                  <div className="counter">
                    <span className="line">
                      {/* for progress change stroke-dasharray="0%,1000" to stroke-dasharray="295%,1000" */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48">
                        <circle
                          cx="24"
                          cy="24"
                          r="22.5"
                          fill="transparent"
                          strokeWidth="3"
                          strokeDasharray="0%,1000"
                          strokeDashoffset="0"
                        />
                      </svg>
                    </span>
                    <span className="index"></span>
                  </div>
                  <div className="name">
                    <h4>Checkout</h4>
                  </div>
                </li>
              </ul>
            </div>

            <div className="step-tab">
              <div className="step-checkout">
                <div className="sub-title">
                  <h3>Checkout</h3>
                </div>

                <div className="form-wrap">
                  <div className="form-fields">
                    <label className="full-size">
                      <span className="label">
                        Email (only for contact regarding the photo)*
                      </span>
                      <span className="field">
                        <input type="text" />
                      </span>
                      <span className="warning">Warning message</span>
                    </label>
                    <label className="full-size">
                      <span className="label">Country *</span>
                      <span className="field select">
                        <select>
                          <option disabled selected>
                            Selcect country
                          </option>
                          <option>Selcect country</option>
                          <option>Selcect country</option>
                          <option>Selcect country</option>
                        </select>
                      </span>
                      <span className="warning">Warning message</span>
                    </label>
                    <label className="full-size">
                      <span className="field checkbox no-border">
                        <span className="name">
                          Please send 2 paper photos to my address +{' '}
                          <span>$3.00</span> (Free delivery)
                        </span>
                        <input type="checkbox" name="" />
                        <span className="wrap">
                          <span className="bullet"></span>
                        </span>
                      </span>
                      <span className="warning">Warning message</span>
                    </label>
                    <label className="full-size">
                      <span className="label">Full name *</span>
                      <span className="field">
                        <input type="text" />
                      </span>
                      <span className="warning">Warning message</span>
                    </label>
                    <label className="full-size">
                      <span className="label">Address *</span>
                      <span className="field">
                        <input type="text" />
                      </span>
                      <span className="warning">Warning message</span>
                    </label>
                    <label className="half-size">
                      <span className="label">Zip code *</span>
                      <span className="field">
                        <input type="text" />
                      </span>
                      <span className="warning">Warning message</span>
                    </label>
                    <label className="half-size">
                      <span className="label">City *</span>
                      <span className="field">
                        <input type="text" />
                      </span>
                      <span className="warning">Warning message</span>
                    </label>
                    <label className="full-size">
                      <span className="field checkbox no-border">
                        <span className="name">
                          <span>
                            I have read and accepted the Terms and Conditions
                            and Privacy Policy.
                          </span>
                        </span>
                        <input type="checkbox" name="" checked />
                        <span className="wrap">
                          <span className="bullet"></span>
                        </span>
                      </span>
                      <span className="warning">Warning message</span>
                    </label>
                    <label className="full-size">
                      <span className="label">
                        Remarks (on shipping, retouch, etc.) *
                      </span>
                      <span className="field">
                        <input type="text" />
                      </span>
                      <span className="warning">Warning message</span>
                    </label>

                    <label className="full-size">
                      <span className="field radio">
                        <span className="name">Google Pay</span>
                        <span className="pay-icon">
                          <img src="images/g-pay.svg" alt="" />
                        </span>
                        <input type="radio" name="payment" />
                        <span className="wrap">
                          <span className="bullet"></span>
                          <span className="border"></span>
                        </span>
                      </span>
                      <span className="warning">Warning message</span>
                    </label>
                    <label className="full-size">
                      <span className="field radio">
                        <span className="name">PayPal</span>
                        <span className="pay-icon">
                          <img src="images/p-pay.svg" alt="" />
                        </span>
                        <input type="radio" name="payment" />
                        <span className="wrap">
                          <span className="bullet"></span>
                          <span className="border"></span>
                        </span>
                      </span>
                      <span className="warning">Warning message</span>
                    </label>
                    <label className="full-size">
                      <span className="field radio">
                        <span className="name">Pay with card</span>
                        <span className="pay-icon">
                          <img src="images/card-pay.svg" alt="" />
                        </span>
                        <input type="radio" name="payment" />
                        <span className="wrap">
                          <span className="bullet"></span>
                          <span className="border"></span>
                        </span>
                      </span>
                      <span className="warning">Warning message</span>
                    </label>

                    <label className="full-size">
                      <span className="label">Credit card number *</span>
                      <span className="field">
                        <input type="text" placeholder="**** **** **** ****" />
                      </span>
                      <span className="warning">Warning message</span>
                    </label>

                    <label className="double-third-size">
                      <span className="label">Expiration Date *</span>
                      <span className="field">
                        <input type="text" placeholder="MM" />
                        <span className="separator"> / </span>
                        <input type="text" placeholder="YY" />
                      </span>
                      <span className="warning">Warning message</span>
                    </label>
                    <label className="third-size">
                      <span className="label">CVV *</span>
                      <span className="field">
                        <input type="text" />
                      </span>
                      <span className="warning">Warning message</span>
                    </label>
                  </div>
                </div>

                <div className="total-info">
                  <table>
                    <tbody>
                      <tr>
                        <td>Subtotal:</td>
                        <td>$12.95</td>
                      </tr>
                      <tr>
                        <td>Discount:</td>
                        <td>
                          <span style={{ color: '#EB5757' }}>23%</span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Total:</td>
                        <td>
                          <span>$9.95</span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="btn-wrap">
                <div className="action-btn">
                  <button type="button" className="main-btn outline">
                    <i className="icon-left"></i>
                    <span>Back</span>
                  </button>
                  <button type="button" className="main-btn">
                    <span>Pay with card</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm
