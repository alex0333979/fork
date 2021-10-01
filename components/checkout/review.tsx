import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import CheckoutLayout from '@/components/checkout/checkoutLayout';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { CONCIERGE_PRICE, SHIPPING_TYPES } from '../../constants';
import { useAuth } from '@/lib/auth';

const CARD_OPTIONS = {
  iconStyle: 'solid' as const,
  style: {
    base: {
      border: 'solid 1px grey',
      iconColor: '#5B616E',
      color: '#5B616E',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883'
      },
      '::placeholder': {
        color: '#5B616E'
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
  const { cart } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const subTotal = useMemo(() => cart?.items?.reduce((a, { price }) => a + price, 0), [cart]);
  const shippingPrice = useMemo(() => {
    const sp = SHIPPING_TYPES.find((s) => s.value === cart?.shippingType);
    return sp?.price ?? 0;
  }, [cart]);

  const [payment, setPayment] = useState({ status: 'initial' });
  const [errorMessage, setErrorMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = useCallback(() => {
    setLoading(true);
    router.push('/checkout/review').then();
    setLoading(false);

    // todo validate stripe form, create order, get payment intent, payment process

    // const cardElement = elements?.getElement();
    // const { error, paymentIntent } = await stripe!.confirmCardPayment(
    //   response.client_secret,
    //   {
    //     payment_method: {
    //       card: cardElement!,
    //       billing_details: { name: input.cardholderName },
    //     },
    //   }
    // );
  }, [router]);

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case 'processing':
      case 'requires_payment_method':
      case 'requires_confirmation':
        return <h3>Processing...</h3>;

      case 'requires_action':
        return <h3>Authenticating...</h3>;

      case 'succeeded':
        return <h3>Payment Succeeded 🥳</h3>;

      case 'error':
        return (
          <>
            <h3>Error 😭</h3>
            <p className="error-message">{errorMessage}</p>
          </>
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
      onSubmit={onSubmit}>
      <div className="form-wrap">
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
                <p>{`$18`}</p>
              </div>
              <div className="name">
                <h3>{'Passport Photo'}</h3>
                <p>{`$0`}</p>
              </div>
            </li>
            <li>
              <div className="name">
                <h3>{'Concierge service'}</h3>
                <p>{`$${CONCIERGE_PRICE / 100}`}</p>
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

            <li>
              <form>
                <CardElement
                  options={CARD_OPTIONS}
                  onChange={(e) => {
                    if (e.error) {
                      setPayment({ status: 'error' });
                      setErrorMessage(e.error.message ?? 'An unknown error occurred');
                    }
                  }}
                />
                <PaymentStatus status={payment.status} />
              </form>
            </li>
          </ol>
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default ReviewAndPay;
