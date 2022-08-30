import React from 'react'
import Image from 'next/image'

const AboutHistory: React.FC = () => (
  <div className="about-why">
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="img">
            <Image src="/images/About/about-4.jpg" layout="fill" alt="" />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="text">
            <h2>Our History</h2>
            <p>
              From year to year we strive to invent the most innovative
              technology.
            </p>
            <ul>
              <li>
                <span>36k</span>
                Passport
                <br />
                Photos
              </li>
              <li>
                <span>18k</span>
                Passport
                <br />
                Applications
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default AboutHistory
