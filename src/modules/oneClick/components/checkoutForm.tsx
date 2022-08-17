import React from 'react'

import { FieldType, ShippingType } from '@/apollo'
import { useOneClickCheckout } from '@/hooks'
import { CHECKOUT_STEP } from '@/constants'
import ProcessStepPhoto from '@/modules/photo/components/processStepPhoto'
import FormElement from '@/modules/checkout/shippingInformation/formElement'
import CheckBox from '@/components/elements/checkBox'

const CheckoutForm: React.FC = () => {
  const {
    billingForm,
    country,
    shippingType,
    error,
    onChangeShippingType,
    onValueChange,
    onSelectCountry,
  } = useOneClickCheckout({
    onSubmitted: () => null,
  })

  return (
    <div className="steps-page">
      <div className="steps-content">
        <div className="step-data">
          <div className="data-wrap">
            <ProcessStepPhoto step={3} steps={CHECKOUT_STEP.steps} />
            <div className="step-tab">
              <div className="step-checkout">
                <div className="sub-title">
                  <h3>Checkout</h3>
                </div>

                <div className="form-wrap">
                  <form>
                    <div className="form-fields">
                      {Object.keys(billingForm).map((key) =>
                        billingForm[key].type === FieldType.CheckBox ? (
                          <CheckBox
                            key={key}
                            className={billingForm[key].size || ''}
                            text={billingForm[key].text || ''}
                            value={shippingType === ShippingType.Free}
                            onChange={() => onChangeShippingType()}
                          />
                        ) : (
                          <FormElement
                            key={key}
                            field={billingForm[key]}
                            country={country}
                            error={error[billingForm[key].name]}
                            onValueChange={onValueChange}
                            onSelectCountry={onSelectCountry}
                          />
                        ),
                      )}
                    </div>
                  </form>
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
