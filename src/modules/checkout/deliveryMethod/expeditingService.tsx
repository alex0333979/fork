import React from 'react'
import classNames from 'classnames'

import RadioElement from '@/components/elements/radioElement'

interface Props {
  optIn: boolean | undefined
  onChange: (v: boolean) => void
}

const ExpeditingService: React.FC<Props> = ({ optIn, onChange }) => (
  <>
    <div className="shipping-title">
      <h3>Passport/Visa Expediting Service (Optional)</h3>
    </div>
    <div className="shipping-data">
      <ol>
        <li>
          <div className="name">
            <h4>
              No need to wait 7 TO 10 WEEKS for your passport, our{' '}
              <span>Verified Passport Expediting Partners</span> can make sure
              you can get your passport as <u>fast as 2 days</u>:
            </h4>
          </div>
          <div className="text">
            <ul className="checked">
              <li>
                <span>Expediting Times:</span> 2 days to 6 weeks
              </li>
              <li>
                <span>Document Pre-Check Sercice:</span> Full review of your US
                Passport Application paperwork
              </li>
              <li>
                <span>Professional Consultation in the next 24 hours:</span>{' '}
                15-min professional video/phone one-on-one consultation today
                (if within businsess hours) or tommorow
              </li>
            </ul>
          </div>
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
        </li>
      </ol>
    </div>
  </>
)

export default ExpeditingService
