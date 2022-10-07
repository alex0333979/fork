import React from 'react'
import { Bars } from 'react-loading-icons'

import { CHECKOUT_STEP } from '@/constants'
import ProcessStepPhoto from '@/modules/photo/components/processStepPhoto'

interface Props {
  step: number
  loading: boolean
  onSubmit: () => void
  onBack: () => void
  nextButtonText?: string
  submitDisabled?: boolean
  children: React.ReactNode
}

const OneClickCheckoutLayout: React.FC<Props> = ({
  step,
  loading,
  children,
  submitDisabled = false,
  onSubmit,
  onBack,
}) => (
  <div className="steps-page">
    <div className="steps-content">
      <div className="step-data">
        <div className="data-wrap">
          <ProcessStepPhoto step={step} steps={CHECKOUT_STEP.steps} />
          {children}
        </div>
        <div className="btn-wrap checkout-btn-wrap">
          <div className="action-btn">
            <button type="button" className="main-btn outline" onClick={onBack}>
              <i className="icon-left"></i>
              <span>Back</span>
            </button>
            <button
              type="button"
              disabled={Boolean(submitDisabled) || loading}
              className="main-btn"
              onClick={onSubmit}>
              {loading ? (
                <Bars height={25} fill="#FFFFFF" stroke="transparent" />
              ) : (
                <span>Pay with card</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default OneClickCheckoutLayout
