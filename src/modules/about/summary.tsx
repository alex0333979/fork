import React from 'react'
import Image from 'next/image'

const Summary: React.FC = () => (
  <div className="about-page top-shadow">
    <span className="circle" />
    <div className="container">
      <div className="row">
        <div className="title col-12 col-lg-5">
          <h1>
            We are all about convenience and speed when it comes to Your
            Passport Photos
          </h1>
          <p className="d-lg-none">
            We invest our resources developing most innovative AI software to
            insure your passport photos meet all Gov requirements - Using your
            mobile or PC
          </p>
          <p className="d-none d-lg-block">
            We invest our resources developing most innovative AI software to
            insure your passport photos meet all Gov requirements - Using your
            mobile or
          </p>
          <ul>
            <li className="d-lg-none">All process is safe</li>
            <li className="d-lg-none">Get approved quickly</li>
            <li className="d-none d-lg-block">Convenience - Quick & Easy</li>
            <li className="d-none d-lg-block">
              Passport photo + Application, everything in one place
            </li>
            <li className="d-none d-lg-block">
              Instant Bio-metric photo approva
            </li>
            <li className="d-none d-lg-block">Ship Directly to your home</li>
          </ul>
        </div>
        <div className="img col-12 col-lg-7">
          <div className="img-wrap">
            <span>
              <Image
                src="/images/About/about-1.jpg"
                width={370}
                height={434}
                alt=""
              />
            </span>
            <span className="d-none d-md-flex">
              <Image
                src="/images/About/about-2.jpg"
                width={354}
                height={455}
                alt=""
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Summary
