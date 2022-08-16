import React from 'react'
import { Bars } from 'react-loading-icons'
import classNames from 'classnames'

interface Props {
  loading: boolean
  submitDisabled?: boolean
  nextButtonText?: string
  onBack: () => void
  onNext: () => void
}

const BottomButtons: React.FC<Props> = ({
  loading,
  submitDisabled = false,
  nextButtonText = 'Next',
  onBack,
  onNext,
}) => (
  <div className="application-toolbar one-click-toolbar">
    <div className="container">
      <div className="data-wrap">
        <div className="back-btn">
          <button
            type="button"
            className="main-btn big outline"
            onClick={onBack}>
            <span className="icon-left" /> Back
          </button>
        </div>
        <div className="next-btn">
          <button
            type="button"
            className={classNames('main-btn big', {
              disabled: submitDisabled,
            })}
            disabled={submitDisabled}
            onClick={onNext}>
            {loading ? (
              <Bars height={25} fill="#FFFFFF" stroke="transparent" />
            ) : (
              <>
                {nextButtonText} <span className="icon-right" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default BottomButtons
