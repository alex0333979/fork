import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CheckoutLayout from '@/components/checkout/checkoutLayout';
import { FieldType, FormField, useAddShippingAddressToCartMutation } from '@/generated/graphql';
import TextInput from '@/components/elements/textInput';
import PhoneInput from '@/components/elements/phoneInput';
import SelectBox from '@/components/elements/selectBox';
import CountryPicker from '@/components/elements/countryPicker';
import StatePicker from '@/components/elements/statePicker';
import DatePicker from '@/components/elements/datePicker';
import { SHIPPING_FORM } from '../../constants';
import { formValidation, ValidationError } from '@/lib/utils/formValidation';
import { useAuth } from '@/lib/auth';

const ShippingInformation: React.FC = () => {
  const router = useRouter();
  const { cart, updateCart, getMe: me } = useAuth();
  const [shippingForm, setShippingForm] = useState<{ [key: string]: FormField }>(SHIPPING_FORM);
  const [country, setCountry] = useState<string>('US');
  const [error, setError] = useState<ValidationError>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(new Date().getTime());
  const [addShippingAddress] = useAddShippingAddressToCartMutation();

  const initializeForm = useCallback(() => {
    const defaultShippingAddress: any = me?.shippingAddress;
    const cartShippingAddress: any = cart?.shippingAddress;
    if (cartShippingAddress) {
      Object.keys(cartShippingAddress).map((key) => {
        if (key in shippingForm) {
          shippingForm[key].value = cartShippingAddress[key];
        }
      });
      setShippingForm(shippingForm);
    } else if (defaultShippingAddress) {
      Object.keys(defaultShippingAddress).map((key) => {
        if (key in shippingForm) {
          shippingForm[key].value = defaultShippingAddress[key];
        }
      });
      setShippingForm(shippingForm);
    } else {
      setShippingForm(SHIPPING_FORM);
    }
  }, [cart?.shippingAddress, me?.shippingAddress, shippingForm]);

  useEffect(() => {
    initializeForm();
    setRefreshKey(new Date().getTime());
  }, [initializeForm]);

  const onValueChange = useCallback(
    (name: string, value: string | number | boolean | undefined) => {
      shippingForm[name].value = value;
      setShippingForm(shippingForm);
      setError({});
    },
    [shippingForm]
  );

  const onSelectedCountry = useCallback(
    (name: string, value: string) => {
      onValueChange(name, value);
      setCountry(value);
    },
    [onValueChange]
  );

  const onSubmit = useCallback(() => {
    const error = formValidation(Object.keys(shippingForm).map((key) => shippingForm[key]));
    setError(error);
    if (Object.keys(error).length > 0) {
      return;
    }
    const shippingAddress: any = {};
    Object.keys(shippingForm).map((key) => {
      shippingAddress[key] = shippingForm[key].value;
    });
    setLoading(true);
    addShippingAddress({ variables: { shippingAddress } }).then(({ data }) => {
      setLoading(false);
      const cart = data?.AddShippingAddressToCart.data;
      if (cart) {
        updateCart(cart);
        router.push('/checkout/payment').then();
      }
    });
  }, [addShippingAddress, router, shippingForm, updateCart]);

  return (
    <CheckoutLayout
      key={refreshKey}
      step={2}
      loading={loading}
      backLink={`/checkout`}
      onSubmit={onSubmit}>
      <div className="form-wrap">
        <div className="form-fields">
          <div className="extra-info">
            <h3>{'Shipping Information'}</h3>
          </div>
        </div>
        <form>
          <div className="form-fields">
            {Object.keys(shippingForm).map((key, index) => {
              const field = shippingForm[key];
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

export default ShippingInformation;
