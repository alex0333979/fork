import React, { useCallback, useState } from 'react';
import { CHECKOUT_STEPS, SHIPPING_PRICE } from '../../constants';
import ProcessStep from '@/components/elements/processStep';
import ApplicationToolbar from '@/components/elements/applicationToolbar';

const DeliveryMethod: React.FC = () => {
  // const { cart } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  // const [setShippingType] = useSetShippingTypeToCartMutation();

  const onSubmit = useCallback(() => {
    setLoading(true);
    console.log('===========');
    setLoading(false);
  }, []);

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
                        <b>{`Add concierge service for just $${SHIPPING_PRICE / 100}!`}</b>
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
                          <b>{`${SHIPPING_PRICE / 100}`}</b>
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
                        <label className="full-size">
                          <span className="field radio with-price">
                            <span className="name">Expedited 3-6 day transit time</span>
                            <span className="price">+$14.95</span>
                            <input type="radio" name="delivery" placeholder="delivery" />
                            <span className="wrap">
                              <span className="bullet" />
                              <span className="border" />
                            </span>
                          </span>
                        </label>

                        <label className="full-size">
                          <span className="field radio with-price">
                            <span className="name">Three business days</span>
                            <span className="price">+$19.95</span>
                            <input type="radio" name="delivery" placeholder="delivery" />
                            <span className="wrap">
                              <span className="bullet" />
                              <span className="border" />
                            </span>
                          </span>
                        </label>

                        <label className="full-size">
                          <span className="field radio with-price">
                            <span className="name">Expedited 1-2 business days</span>
                            <span className="price">+$29.95</span>
                            <input type="radio" name="delivery" placeholder="delivery" />
                            <span className="wrap">
                              <span className="bullet" />
                              <span className="border" />
                            </span>
                          </span>
                        </label>

                        <label className="full-size">
                          <span className="field radio with-price">
                            <span className="name">Free standard shipping</span>
                            <span className="price">FREE</span>
                            <input type="radio" name="delivery" placeholder="delivery" />
                            <span className="wrap">
                              <span className="bullet" />
                              <span className="border" />
                            </span>
                          </span>
                        </label>
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
