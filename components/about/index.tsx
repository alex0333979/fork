import React from 'react';
import Image from 'next/image';

const About: React.FC = () => (
  <>
    <div className="about-page top-shadow">
      <span className="circle" />
      <div className="container">
        <div className="row">
          <div className="title col-12 col-lg-5">
            <h1>{'We all about making passport ;easy.'}</h1>
            <p className="d-lg-none">
              {`From year to year we strive to invent the most innovative technology that is used by
                small enterprises technology that is used by small enterprises.`}
            </p>
            <p className="d-none d-lg-block">
              {`From year to year we strive to invent the most innovative technology that is used by
                both passport application and standard passport photo.`}
            </p>
            <ul>
              <li className="d-lg-none">{'All process is safe'}</li>
              <li className="d-lg-none">{'Get approved quickly'}</li>
              <li className="d-none d-lg-block">{'Convenience - Quick & Easy'}</li>
              <li className="d-none d-lg-block">
                {'Passport photo + Application, everything in one place'}
              </li>
              <li className="d-none d-lg-block">{'Instant Bio-metric photo approval'}</li>
              <li className="d-none d-lg-block">{'Ship Directly to your home'}</li>
            </ul>
          </div>
          <div className="img col-12 col-lg-7">
            <div className="img-wrap">
              <span>
                <Image src="/images/About/about-1.jpg" width={370} height={434} alt="" />
              </span>
              <span className="d-none d-md-flex">
                <Image src="/images/About/about-2.jpg" width={354} height={455} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="about-values">
      <span className="bg-gradient" />
      <div className="container">
        <div className="title">
          <h2>{'A few things you should know about Us.'}</h2>
        </div>
        <div className="row">
          <div className="col-12 col-lg-3">
            <div className="text">
              <h3>{'Our values'}</h3>
              <p>{'We strive to redefine the standard of excellence.'}</p>
            </div>
          </div>
          <div className="col-12 col-lg-9">
            <div className="list">
              <ul>
                <li>
                  <div className="icon">
                    <Image src="/images/About/workflow.svg" width={40} height={40} alt="" />
                  </div>
                  <h4>{'Collaboration'}</h4>
                  <p>
                    {`Collaboration is the process of two or more people or organizations working
                      together to complete a task or achieve a goal.`}
                  </p>
                </li>
                <li>
                  <div className="icon">
                    <Image src="/images/About/multiple_shape.svg" width={40} height={40} alt="" />
                  </div>
                  <h4>{'Transparency'}</h4>
                  <p>
                    {`Transparency, as used in science is operating in such a way that it is easy for
                      others to see what actions are performed.`}
                  </p>
                </li>

                <li>
                  <div className="icon">
                    <Image src="/images/About/like.svg" width={40} height={40} alt="" />
                  </div>
                  <h4>{'Trust'}</h4>
                  <p>
                    {`Trust will help us foster a positive and productive environment that delivers
                      value to our users and customers.`}
                  </p>
                </li>
                <li>
                  <div className="icon">
                    <Image src="/images/About/integrity.svg" width={40} height={40} alt="" />
                  </div>
                  <h4>{'Integrity'}</h4>
                  <p>
                    {`Integrity is the practice of showing a consistent and uncompromising adherence
                      to strong moral and ethical principles.`}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="about-info">
      <div className="container">
        <div className="row align-items-lg-center">
          <div className="col-12 col-lg-6">
            <div className="img">
              <Image src="/images/About/about-3.jpg" layout={'fill'} alt="" />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="text">
              <h2>{'What we do'}</h2>
              <p>
                {`We supply enterprises, organizations and institutes of high-tech industries with
                  modern components. We build long-term trusting relationships with our customers and
                  partners for further fruitful cooperation.`}
              </p>
              <p>
                {`From year to year we strive to invent the most innovative technology that is used by
                  both small enterprises and space enterprises.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="about-why">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="img">
              <Image src="/images/About/about-4.jpg" layout={'fill'} alt="" />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="text">
              <h2>Why Work Here</h2>
              <p>From year to year we strive to invent the most innovative technology.</p>
              <ul>
                <li>
                  <span>26k</span>Passport
                  <br /> Application
                </li>
                <li>
                  <span>12k</span>Passport
                  <br /> Photos
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default About;
