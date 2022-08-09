import React from 'react'
import Image from 'next/image'
import { Link } from '@material-ui/core'

import { PAGES } from '@/constants'

const ThankYou: React.FC = () => (
  <div className="success-page">
    <div className="container">
      <div className="data-wrap">
        <div className="success-content">
          <div className="img-wrap">
            <Image src="/images/done.png" width={222} height={167} alt="" />
          </div>
          <div className="sub-title">
            <h3>Transaction completed successfully</h3>
            <p>Thank you</p>
          </div>
          <div className="btn-wrap">
            <Link href={PAGES.home}>
              <button className="main-btn big">Back to Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ThankYou
