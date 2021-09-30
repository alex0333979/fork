import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import CheckoutLayout from '@/components/checkout/checkoutLayout';

const PaymentInformation: React.FC = () => {
  const router = useRouter();
  // const { cart, updateCart } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(() => {
    setLoading(true);
    router.push('/checkout/review').then();
    setLoading(false);
  }, [router]);

  return (
    <CheckoutLayout step={3} loading={loading} backLink={`/checkout/shipping`} onSubmit={onSubmit}>
      <div className="form-wrap">
        <div className="form-fields">
          <div className="extra-info">
            <h3>{'Payment Information'}</h3>
          </div>
        </div>
        <form>

        </form>
      </div>
    </CheckoutLayout>
  );
};

export default PaymentInformation;
