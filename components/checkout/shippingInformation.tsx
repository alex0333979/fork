import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import CheckoutLayout from '@/components/checkout/checkoutLayout';

const ShippingInformation: React.FC = () => {
  const router = useRouter();
  // const { cart, updateCart } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(() => {
    setLoading(true);
    router.push('/checkout/payment').then();
    setLoading(false);
  }, [router]);

  return (
    <CheckoutLayout step={2} loading={loading} backLink={`/checkout`} onSubmit={onSubmit}>
      <div className="form-wrap"></div>
    </CheckoutLayout>
  );
};

export default ShippingInformation;
