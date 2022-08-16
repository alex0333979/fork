import React from 'react'
import { CHECKOUT_STEPS } from '@/constants'
import ProcessStep from '@/components/elements/processStep'

import BottomButtons from './bottomButtons'

interface Props {
  step: number
  completedStep: number
  loading: boolean
  onSubmit: () => void
  onBack: () => void
  nextButtonText?: string
  submitDisabled?: boolean
  children: React.ReactNode
}

const OneClickCheckoutLayout: React.FC<Props> = ({
  step,
  completedStep,
  loading,
  children,
  nextButtonText = 'Next',
  submitDisabled = false,
  onSubmit,
  onBack,
}) => (
  <div className="cart-page">
    <div className="page-title">
      <div className="container">
        <div className="data-wrap">
          <h1>Checkout</h1>
        </div>
      </div>
    </div>
    <div className="floating-wrap">
      <div className="application-form">
        <div className="container">
          <div className="data-wrap horizontal">
            <ProcessStep
              title={CHECKOUT_STEPS.title}
              step={step}
              steps={CHECKOUT_STEPS.steps}
              completeStep={completedStep}
            />
            {children}
          </div>
        </div>
      </div>
      <BottomButtons
        loading={loading}
        submitDisabled={submitDisabled}
        nextButtonText={nextButtonText}
        onBack={onBack}
        onNext={onSubmit}
      />
    </div>
  </div>
)

export default OneClickCheckoutLayout
