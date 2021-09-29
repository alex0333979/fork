import React from 'react';
import { CHECKOUT_STEPS } from '../../constants';
import ProcessStep from '@/components/elements/processStep';
import ApplicationToolbar from '@/components/elements/applicationToolbar';

interface CheckoutLayoutProps {
  step: number;
  loading: boolean;
  backLink: string | undefined;
  onSubmit: () => void;
  children: React.ReactNode;
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({
  step,
  loading,
  backLink,
  children,
  onSubmit
}) => (
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
            <ProcessStep title={CHECKOUT_STEPS.title} step={step} steps={CHECKOUT_STEPS.steps} />
            {children}
          </div>
        </div>
      </div>
      <ApplicationToolbar backLink={backLink} loading={loading} onNext={onSubmit} />
    </div>
  </div>
);

export default CheckoutLayout;
