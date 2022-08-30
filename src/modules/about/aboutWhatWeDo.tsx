import React from 'react'
import Image from 'next/image'

const AboutWhatWeDo: React.FC = () => (
  <div className="about-info">
    <div className="container">
      <div className="row align-items-lg-center">
        <div className="col-12 col-lg-6">
          <div className="img">
            <Image src="/images/About/about-3.jpg" layout="fill" alt="" />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="text">
            <h2>What we do</h2>
            <p>
              We’ve made taking passport photos simple. Our AI technology will
              scan and approve your photo in seconds.
            </p>
            <p>
              No need to leave your house, print them at home or have us print
              and ship them to your door.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default AboutWhatWeDo
