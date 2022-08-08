import React from 'react'
import Image from 'next/image'

const AboutValues: React.FC = () => (
  <div className="about-values">
    <span className="bg-gradient" />
    <div className="container">
      <div className="title">
        <h2>A few things you should know about Us.</h2>
      </div>
      <div className="row">
        <div className="col-12 col-lg-3">
          <div className="text">
            <h3>Our values</h3>
            <p>We strive to redefine the standard of excellence.</p>
          </div>
        </div>
        <div className="col-12 col-lg-9">
          <div className="list">
            <ul>
              <li>
                <div className="icon">
                  <Image
                    src="/images/About/workflow.svg"
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>
                <h4>Convenience</h4>
                <p>
                  Verified passport photos by proprietary AI software - within
                  seconds. Sent to you wherever you are. No need to wait for so
                  called “experts” to verify your photo or wait in line at the
                  local drug store
                </p>
              </li>
              <li>
                <div className="icon">
                  <Image
                    src="/images/About/multiple_shape.svg"
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>
                <h4>It Is All About The Service</h4>
                <p>
                  We are committed to assisting you every step of the way. We
                  are responsive and caring. We know it’s a 10 year photo
                  investment.
                </p>
              </li>

              <li>
                <div className="icon">
                  <Image
                    src="/images/About/like.svg"
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>
                <h4>Guaranteed Photo Compliance</h4>
                <p>
                  Our software and quality control process ensures that your
                  photo meets all the government biometric requirements, 100%.
                  If, by some crazy chance, your photos gets rejected we’ll
                  refund your money and issue another photo free of charge
                </p>
              </li>
              <li>
                <div className="icon">
                  <Image
                    src="/images/About/integrity.svg"
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>
                <h4>{'Integrity'}</h4>
                <p>
                  Integrity is the practice of showing a consistent and
                  uncompromising adherence to strong moral and ethical
                  principles.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default AboutValues
