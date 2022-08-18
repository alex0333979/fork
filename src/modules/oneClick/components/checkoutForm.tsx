import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { FieldType, ShippingType } from '@/apollo'
import { useOneClickCheckout, useCurrency } from '@/hooks'
import FormElement from '@/modules/checkout/shippingInformation/formElement'
import CheckBox from '@/components/elements/checkBox'
import OneClickCheckoutLayout from './oneClickCheckoutLayout'

const CheckoutForm: React.FC = () => {
  const { t } = useTranslation()
  const { currentCurrency } = useCurrency()

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
    <OneClickCheckoutLayout
      step={3}
      loading={false}
      onSubmit={() => null}
      onBack={() => null}
      submitDisabled={false}
      nextButtonText="Next">
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
                  text={
                    <Trans
                      i18nKey={billingForm[key].text || ''}
                      values={{
                        value: t('currency', {
                          value: 3,
                          currency: currentCurrency.label,
                        }),
                      }}
                      components={{
                        comp: <span className="free-sipping-price" />,
                      }}
                    />
                  }
                  value={shippingType === ShippingType.Free}
                  onChange={() => onChangeShippingType()}
                />
              ) : (
                <FormElement
                  key={`${key}-${country}`}
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
    </OneClickCheckoutLayout>
  )
}

export default CheckoutForm
