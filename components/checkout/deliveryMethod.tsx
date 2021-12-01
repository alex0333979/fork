import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ShippingType, useSetShippingTypeToCartMutation } from '@/generated/graphql';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';
import CheckoutLayout from '@/components/checkout/checkoutLayout';
import { CONCIERGE_PRICE, PAGES, SHIPPING_TYPES } from '../../constants';

const DeliveryMethod: React.FC = () => {
  const router = useRouter();
  const { cart, updateCart } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [shippingType, setShippingType] = useState<string>(cart?.shippingType ?? ShippingType.Free);
  const [setShippingTypeToCart] = useSetShippingTypeToCartMutation();
  const subTotal = useMemo(
    () =>
      shippingType === ShippingType.NoShipping
        ? 0
        : (SHIPPING_TYPES.find((s) => s.value === shippingType)?.price ?? 0) + CONCIERGE_PRICE,
    [shippingType]
  );

  useEffect(() => {
    setShippingType(cart?.shippingType ?? ShippingType.Free);
  }, [cart]);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    const { data } = await setShippingTypeToCart({ variables: { shippingType } });
    setLoading(false);
    const cart = data?.SetShippingTypeToCart.data;
    if (cart) {
      updateCart(cart);
      if (cart.shippingType === ShippingType.NoShipping) {
        await router.push(PAGES.checkout.payment);
      } else {
        await router.push(PAGES.checkout.shipping);
      }
    }
  }, [router, setShippingTypeToCart, shippingType, updateCart]);

  return (
    <CheckoutLayout
      step={1}
      loading={loading}
      backLink={PAGES.cart}
      onSubmit={onSubmit}
      completeStep={0}>
      <div className="form-wrap">
        <div className="switcher-box">
          <label>
            <input
              type="checkbox"
              checked={shippingType !== ShippingType.NoShipping}
              onChange={(e) =>
                setShippingType(e.target.checked ? ShippingType.Free : ShippingType.NoShipping)
              }
            />
            <span className="box-wrap">
              <span className="option">{'Print at home'}</span>
              <span className="slider" />
              <span className="option" data-status={'Recommended'}>
                <b>{`Add concierge service for just $${(CONCIERGE_PRICE ?? 0) / 100}!`} </b>
              </span>
            </span>
          </label>
        </div>
        <div className="shipping-data">
          <ol>
            <li>
              <div className="name">
                <h3>{'Subtotal'}</h3>
                <p>
                  {'Just '}
                  <b>{`$${(subTotal ?? 0) / 100}`}</b>
                </p>
              </div>
            </li>
            <li>
              <div className="name">
                {shippingType === ShippingType.NoShipping ? (
                  <h3>
                    <span>{'Not Included:'}</span>
                  </h3>
                ) : (
                  <h3>{'Included:'}</h3>
                )}
              </div>
              <div className="text">
                <ul>
                  <li>
                    {
                      'We will print your documents and send them to you (cost of shipping not included)'
                    }
                  </li>
                  <li>{'4 Passport photos per person'}</li>
                  <li>{'Processing instruction guide'}</li>
                </ul>
              </div>
            </li>
            <li>
              <div className="name">
                <h3>{'Delivery method'}</h3>
              </div>
              <div className="form-fields">
                {SHIPPING_TYPES.map((option, index) => (
                  <label key={index} className="full-size">
                    <span className="field radio with-price">
                      <span className="name">{option.title}</span>
                      <span className="price">
                        {option.price > 0 ? `+$${option.price / 100}` : 'FREE'}
                      </span>
                      <input
                        type="radio"
                        name="delivery"
                        checked={shippingType === option.value}
                        placeholder="delivery"
                        onChange={() => setShippingType(option.value)}
                      />
                      <span className="wrap">
                        <span className="bullet" />
                        <span className="border" />
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </li>
          </ol>
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default DeliveryMethod;
