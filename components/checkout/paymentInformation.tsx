import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CheckoutLayout from '@/components/checkout/checkoutLayout';
import { FieldType, FormField, useAddBillingAddressToCartMutation } from '@/generated/graphql';
import { BILLING_FORM } from '../../constants';
import { useAuth } from '@/lib/auth';
import TextInput from '@/components/elements/textInput';
import PhoneInput from '@/components/elements/phoneInput';
import SelectBox from '@/components/elements/selectBox';
import CountryPicker from '@/components/elements/countryPicker';
import StatePicker from '@/components/elements/statePicker';
import DatePicker from '@/components/elements/datePicker';
import { formValidation, ValidationError } from '@/lib/utils/formValidation';
import CheckBox from '@/components/elements/checkBox';

const PaymentInformation: React.FC = () => {
  const router = useRouter();
  const { cart, updateCart, getMe: me } = useAuth();
  const [billingForm, setBillingForm] = useState<{ [key: string]: FormField }>({ ...BILLING_FORM });
  const [country, setCountry] = useState<string>('US');
  const [error, setError] = useState<ValidationError>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(new Date().getTime());
  const [sameAddress, setSameAddress] = useState<boolean>(false);
  const [addBillingAddress] = useAddBillingAddressToCartMutation();

  const initializeForm = useCallback(() => {
    const initialForm = { ...BILLING_FORM };
    const _billingAddress: any | undefined = cart?.billingAddress || me?.billingAddress;
    if (_billingAddress) {
      Object.keys(_billingAddress).map((key) => {
        if (key in initialForm) {
          initialForm[key].value = _billingAddress[key];
        }
      });
    }
    setBillingForm(initialForm);
    setRefreshKey(new Date().getTime());
  }, [cart?.billingAddress, me?.billingAddress]);

  useEffect(() => {
    initializeForm();
  }, [initializeForm]);

  const onChangeSameAddress = useCallback(
    (status: boolean) => {
      setSameAddress(status);
      if (status) {
        const updateBillingForm = { ...billingForm };
        const cartShippingAddress: any = cart?.shippingAddress;
        if (cartShippingAddress) {
          Object.keys(updateBillingForm).map((key) => {
            if (key in updateBillingForm) {
              updateBillingForm[key].value = cartShippingAddress[key];
            }
          });
        }
        setBillingForm(updateBillingForm);
      } else {
        initializeForm();
      }
    },
    [billingForm, cart?.shippingAddress, initializeForm]
  );

  const onValueChange = useCallback(
    (name: string, value: string | number | boolean | undefined) => {
      const _billingForm = { ...billingForm };
      _billingForm[name].value = value;
      setBillingForm(_billingForm);
      setError({});
    },
    [billingForm]
  );

  const onSelectedCountry = useCallback(
    (name: string, value: string) => {
      onValueChange(name, value);
      setCountry(value);
    },
    [onValueChange]
  );

  const onSubmit = useCallback(() => {
    const error = formValidation(Object.keys(billingForm).map((key) => billingForm[key]));
    setError(error);
    if (Object.keys(error).length > 0) {
      return;
    }
    const billingAddress: any = {};
    Object.keys(billingForm).map((key) => {
      billingAddress[key] = billingForm[key].value;
    });
    setLoading(true);
    addBillingAddress({ variables: { billingAddress } }).then(({ data }) => {
      setLoading(false);
      const cart = data?.AddBillingAddressToCart.data;
      if (cart) {
        updateCart(cart);
        router.push('/checkout/review').then();
      }
    });
  }, [addBillingAddress, billingForm, router, updateCart]);

  return (
    <CheckoutLayout
      key={refreshKey}
      step={3}
      loading={loading}
      backLink={`/checkout/shipping`}
      onSubmit={onSubmit}>
      <div className="form-wrap">
        <div className="form-fields">
          <div className="extra-info">
            <h3>{'Payment Information'}</h3>
          </div>
        </div>
        <form>
          <div className="form-fields">
            <CheckBox
              text={'Billing address Is the same with shipping address'}
              value={sameAddress}
              onChange={onChangeSameAddress}
            />
            {Object.keys(billingForm).map((key, index) => {
              const field = billingForm[key];
              switch (field.type) {
                case FieldType.Input:
                  return (
                    <TextInput
                      key={index}
                      formField={field}
                      onValueChange={onValueChange}
                      error={error[field.name]}
                    />
                  );
                case FieldType.PhoneInput:
                  return (
                    <PhoneInput
                      key={index}
                      formField={field}
                      onValueChange={onValueChange}
                      error={error[field.name]}
                    />
                  );
                case FieldType.Select:
                  return (
                    <SelectBox
                      key={index}
                      formField={field}
                      onValueChange={onValueChange}
                      error={error[field.name]}
                    />
                  );
                case FieldType.CountryPicker:
                  return (
                    <CountryPicker
                      key={index}
                      formField={field}
                      selectedCountry={onSelectedCountry}
                      error={error[field.name]}
                    />
                  );
                case FieldType.StatePicker:
                  return (
                    <StatePicker
                      key={index}
                      formField={field}
                      selectedState={onValueChange}
                      country={country}
                      error={error[field.name]}
                    />
                  );
                case FieldType.DatePicker:
                  return (
                    <DatePicker
                      key={index}
                      formField={field}
                      onValueChange={onValueChange}
                      error={error[field.name]}
                    />
                  );
              }
            })}
          </div>
        </form>
      </div>
    </CheckoutLayout>
  );
};

export default PaymentInformation;
