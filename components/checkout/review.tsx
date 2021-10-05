import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import CheckoutLayout from '@/components/checkout/checkoutLayout';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { CONCIERGE_PRICE, SHIPPING_TYPES } from '../../constants';
import { useAuth } from '@/lib/auth';
import {
  ProductType,
  useClearCartMutation,
  useCreateOrderMutation,
  useGetPaymentIntentMutation
} from '@/generated/graphql';
import classNames from 'classnames';
import { ValidationError } from '@/lib/utils/formValidation';

const CARD_OPTIONS = {
  iconStyle: 'solid' as const,
  style: {
    base: {
      border: 'solid 1px grey',
      iconColor: '#5b616e',
      color: '#000000',
      fontWeight: 'normal',
      fontSize: '14px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883'
      },
      '::placeholder': {
        color: '#5b616e'
      }
    },
    invalid: {
      iconColor: '#ef2961',
      color: '#ef2961'
    }
  }
};

const ReviewAndPay: React.FC = () => {
  const router = useRouter();
  const { cart, updateCart, isAuthenticated } = useAuth();
  const [cardName, setCardName] = useState<string>('');
  const [error, setError] = useState<ValidationError>({});
  const [stripeFocus, setStripeFocus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [payment, setPayment] = useState({ status: 'initial' });
  const [createOrder] = useCreateOrderMutation();
  const [getPaymentIntent] = useGetPaymentIntentMutation();
  const [clearCart] = useClearCartMutation();

  const stripe = useStripe();
  const elements = useElements();

  const subTotal = useMemo(() => cart?.items?.reduce((a, { price }) => a + price, 0), [cart]);
  const shippingPrice = useMemo(
    () => SHIPPING_TYPES.find((s) => s.value === cart?.shippingType)?.price ?? 0,
    [cart]
  );
  const aPrice = useMemo(
    () =>
      cart?.items
        ?.filter((c) => c.product === ProductType.PassportApplication)
        .reduce((a, { price }) => a + price, 0),
    [cart]
  );
  const pPrice = useMemo(
    () =>
      cart?.items
        ?.filter((c) => c.product === ProductType.PassportPhoto)
        .reduce((a, { price }) => a + price, 0),
    [cart]
  );

  const handleInputChange = useCallback((e) => {
    setError((errors) => ({
      ...errors,
      cardName: ''
    }));
    setCardName(e.target.value);
  }, []);

  const onSubmit = useCallback(async () => {
    const cardElement = elements?.getElement(CardElement);
    if (!cardElement || !stripe) {
      return;
    }

    if (!cardName) {
      setError((errors) => ({
        ...errors,
        cardName: 'This field is required'
      }));
      return;
    } else if (error.cardNumber) {
      return;
    }

    if (!isAuthenticated) {
      // todo show login Form
      return;
    }

    setLoading(true);
    const { data } = await createOrder({});
    setLoading(false);

    const order = data?.CreateOrder.data;
    if (!order) {
      setPayment({ status: 'error' });
      setError((errors) => ({
        ...errors,
        result: 'Create order is failed.'
      }));
      return;
    }

    setLoading(true);
    const { data: intent } = await getPaymentIntent({ variables: { orderId: order.id } });
    setLoading(false);
    const clientSecret = intent?.GetPaymentIntent.data?.clientSecret;
    if (!clientSecret) {
      setPayment({ status: 'error' });
      setError((errors) => ({
        ...errors,
        result: 'Get payment intent is failed'
      }));
      return;
    }

    setLoading(true);
    const { error: pError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement, billing_details: { name: cardName } }
    });
    setLoading(false);

    if (pError) {
      setPayment({ status: 'error' });
      setError((errors) => ({
        ...errors,
        result: pError.message ?? 'An unknown error occurred'
      }));
    } else if (paymentIntent) {
      setPayment(paymentIntent);
      const { data } = await clearCart({});
      const cart = data?.ClearCart.data;
      if (cart) {
        updateCart(cart);
      }
      await router.push('/');
    }
  }, [
    cardName,
    clearCart,
    createOrder,
    elements,
    error.cardNumber,
    getPaymentIntent,
    isAuthenticated,
    router,
    stripe,
    updateCart
  ]);

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case 'processing':
      case 'requires_payment_method':
      case 'requires_confirmation':
        return (
          <div className="form-fields">
            <div className="form-notice">
              <p>
                {'Processing...'}
                <span className="icon-info" />
              </p>
            </div>
          </div>
        );

      case 'requires_action':
        return (
          <div className="form-fields">
            <div className="form-notice">
              <p>
                {'Authenticating...'}
                <span className="icon-info" />
              </p>
            </div>
          </div>
        );

      case 'succeeded':
        return (
          <div className="form-fields">
            <div className="form-notice">
              <p>
                {'Payment succeeded'}
                <span className="icon-info" />
              </p>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="form-fields">
            <div className="form-notice">
              <p>
                {error.result}
                <span className="icon-info" />
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <CheckoutLayout
      step={4}
      loading={loading}
      backLink={`/checkout/payment`}
      nextButtonText={'Check out'}
      disableSubmit={!['initial', 'succeeded', 'error'].includes(payment.status) || !stripe}
      onSubmit={onSubmit}>
      <div className="form-wrap">
        <PaymentStatus status={payment.status} />
        <div className="form-fields">
          <div className="extra-info">
            <h3>{'Review and Pay'}</h3>
          </div>
        </div>
        <div className="shipping-data">
          <ol>
            <li>
              <div className="name">
                <h3>{'Order summery'}</h3>
              </div>
            </li>
            <li>
              <div className="name">
                <h3>{'Passport Application'}</h3>
                <p>{`$${(aPrice ?? 0) / 100}`}</p>
              </div>
              <div className="name">
                <h3>{'Passport Photo'}</h3>
                <p>{`$${(pPrice ?? 0) / 100}`}</p>
              </div>
            </li>
            <li>
              <div className="name">
                <h3>{'Concierge service'}</h3>
                <p>{`$${(cart?.addConcierge ? CONCIERGE_PRICE : 0) / 100}`}</p>
              </div>
              <div className="name">
                <h3>{'SubTotal'}</h3>
                <p>{`$${(subTotal ?? 0) / 100}`}</p>
              </div>
              <div className="name">
                <h3>{'Tax'}</h3>
                <p>{`$0`}</p>
              </div>
              <div className="name">
                <h3>{'Shipping'}</h3>
                <p>{`$${(shippingPrice ?? 0) / 100}`}</p>
              </div>
            </li>
            <li>
              <div className="name">
                <h3>{'Total'}</h3>
                <p>{`$${((cart?.totalPrice ?? 0) + CONCIERGE_PRICE) / 100}`}</p>
              </div>
            </li>
          </ol>
        </div>
        <div className="shipping-data">
          <ol>
            <li>
              <div className="name">
                <h3>{'Card Info'}</h3>
              </div>
            </li>
            <li>
              <form>
                <div className="form-fields">
                  <label className="full-size">
                    <span className="label">{'Name on the card *'}</span>
                    <span className="field">
                      <input
                        type="text"
                        className={classNames({
                          'error-border': !!error.cardName
                        })}
                        name="cardName"
                        placeholder="Name on the card"
                        value={cardName}
                        onChange={handleInputChange}
                      />
                    </span>
                    {error.cardName ? <span className="attention">{error.cardName}</span> : <></>}
                  </label>
                  <label className="full-size">
                    <span className="label">{'Card number'}</span>
                    <span className="field">
                      <span
                        className={classNames('stripe-input', {
                          focus: stripeFocus,
                          'error-border': !!error.cardNumber
                        })}>
                        <CardElement
                          options={CARD_OPTIONS}
                          onFocus={() => setStripeFocus(true)}
                          onBlur={() => setStripeFocus(false)}
                          onChange={(e) => {
                            setError({});
                            if (e.error) {
                              setError((errors) => ({
                                ...errors,
                                cardNumber: e.error?.message ?? 'An unknown error occurred'
                              }));
                            }
                          }}
                        />
                      </span>
                    </span>
                    {error.cardNumber ? (
                      <span className="attention">{error.cardNumber}</span>
                    ) : (
                      <></>
                    )}
                  </label>
                </div>
              </form>
            </li>
          </ol>
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default ReviewAndPay;
