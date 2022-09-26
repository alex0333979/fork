import React from 'react'
import classNames from 'classnames'

import RadioElement from '@/components/elements/radioElement'

interface Props {
  optIn: boolean | undefined
  onChange: (v: boolean) => void
}

const ExpeditingService: React.FC<Props> = ({ optIn, onChange }) => (
  <>
    <div className="checkout-element-title">
      <div>2</div>Passport / Visa Expediting Service(Optional)
    </div>
    <div className="pl-4">
      <b className="expediting-service-desc">
        No need to wait 7 TO 10 weeks for your passport, our{' '}
        <span>VERIFIED PASSPORT EXPEDITING PARTNERS</span> can make sure you can
        get your passport as <span>fast as 2 days.</span>
      </b>

      <div className="text">
        <ul className="checked check-mark">
          <li>
            <b>Expediting Times:</b> 2 days to 6 weeks
          </li>
          <li>
            <b>Document Pre-Check Service:</b> Full review of your US Passport
            Application paperwork
          </li>
          <li>
            <b>Professional consultation in the next 24 hours:</b> 15-min
            professional video/phone one-on-one consultation today (if within
            business hours) or tomorrow
          </li>
        </ul>
      </div>
    </div>
    <div className="service-options mt-3">
      <div className="form-fields">
        <RadioElement<boolean>
          className={classNames('expediting-service-option', {
            'option-selected': optIn === true,
          })}
          label="Yes, I look forward to hearing from a consultant"
          name="expeditingService"
          selected={optIn === true}
          value={true}
          onSelect={onChange}
        />
        <RadioElement<boolean>
          className={classNames('expediting-service-option', {
            'option-selected': optIn === false,
          })}
          label="No, I will process my passport/s on my own"
          name="expeditingService"
          selected={optIn === false}
          value={false}
          onSelect={onChange}
        />
      </div>
    </div>
  </>
)

export default ExpeditingService
