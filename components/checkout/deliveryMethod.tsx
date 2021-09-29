import React, { useCallback, useMemo, useState } from 'react';
import { CHECKOUT_STEPS, SHIPPING_PRICE } from '../../constants';
import ProcessStep from '@/components/elements/processStep';
import ApplicationToolbar from '@/components/elements/applicationToolbar';
import { ShippingType, useSetShippingTypeToCartMutation } from '@/generated/graphql';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';

const shippingTypes: { title: string; price: number; value: string }[] = [
  {
    title: 'Expedited 3-6 day transit time',
    price: 1495,
    value: ShippingType.From3To6
  },
  {
    title: 'Three business days',
    price: 1995,
    value: ShippingType.From3To3
  },
  {
    title: 'Expedited 1-2 business days',
    price: 2995,
    value: ShippingType.From3To6
  },
  {
    title: 'Free standard shipping',
    price: 0,
    value: ShippingType.From3To6
  }
];

const DeliveryMethod: React.FC = () => {
  const router = useRouter();
  const { cart, updateCart } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [shippingType, setShippingType] = useState<string>(cart?.shippingType ?? ShippingType.Free);
  const [setShippingTypeToCart] = useSetShippingTypeToCartMutation();
  const subTotal = useMemo(() => cart?.items?.reduce((a, { price }) => a + price, 0), [cart]);

  const onSubmit = useCallback(() => {
    setLoading(true);
    setShippingTypeToCart({ variables: { shippingType } }).then(({ data }) => {
      setLoading(false);
      const cart = data?.SetShippingTypeToCart.data;
      if (cart) {
        updateCart(cart);
        router.push('/checkout/shipping').then();
      }
    });
  }, [router, setShippingTypeToCart, shippingType, updateCart]);

  return (
    <div className="cart-page">
      <div className="page-title">
        <div className="container">
          <div className="data-wrap">
            <h1>{'Check out'}</h1>
            <div className="m-only">
              <p>{'New Passport Application'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="floating-wrap">
        <div className="application-form">
          <div className="container">
            <div className="data-wrap horizontal">
              <ProcessStep title={CHECKOUT_STEPS.title} step={1} steps={CHECKOUT_STEPS.steps} />
              <div className="form-wrap">
                <div className="switcher-box">
                  <label>
                    <input type="checkbox" />
                    <span className="box-wrap">
                      <span className="option">{'Print at home'}</span>
                      <span className="slider" />
                      <span className="option" data-status={'Recommended'}>
                        <b>{`Add concierge service for just $${subTotal ?? 0 / 100}!`}</b>
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
                          <b>{`$${SHIPPING_PRICE / 100}`}</b>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="name">
                        <h3>{'Included:'}</h3>
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
                        {shippingTypes.map((option, index) => (
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
            </div>
          </div>
        </div>
        <ApplicationToolbar
          step={1}
          nextLink={`/checkout/shipping`}
          loading={loading}
          onNext={onSubmit}
        />
      </div>
    </div>
  );
};

export default DeliveryMethod;
