import React from 'react';
import Image from 'next/image';

const ContactUs: React.FC = () => (
  <>
    <div className="contacts-page">
      <div className="container">
        <div className="title">
          <div className="contacts-bg">
            <Image src="/images/Contacts/contacts-bg.jpg" width={1328} height={659} alt="" />
          </div>
          <h1>
            {'We are an '}
            <br />
            {'online passport service company'}
            <br />
            {'based in '}
            <span>{'New York'}</span>
            {' and '}
            <span>{'Los Angeles'}</span>.
          </h1>
        </div>
      </div>
    </div>

    <div className="contacts-data">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="title">
              <h2>{'Contact Us'}</h2>
              <p>
                {`Please find our contact details and form below for general queries and order inquiries.
                 We're here to help!`}
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="text">
              <ul>
                <li>
                  <h3>{'EMAIL SUPPORT'}</h3>
                  <p>
                    <a href="mailto:support@passportphotos.com">{'support@passportphotos.com'}</a>
                  </p>
                </li>
                <li>
                  <h3>{'OPERATING HOURS'}</h3>
                  <p>{'Mon - Fri: 10am - 6pm'}</p>
                </li>
                <li>
                  <h3>{'Office Address'}</h3>
                  <p>
                    {'185 Great Neck Road, NY'}
                    <br />
                    {'11021'}
                  </p>
                </li>
              </ul>
              <div className="btn">
                <a>
                  {'Get Directions'}
                  <span className="icon-longarrow" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <form>
              <label className="form-field col-12 col-lg-6">
                <span>{'First Name*'}</span>
                <input type="text" placeholder="First Name" />
              </label>
              <label className="form-field col-12 col-lg-6">
                <span>{'Last Name*'}</span>
                <input type="text" placeholder="Last Name" />
              </label>
              <label className="form-field col-12 col-lg-6">
                <span>{'Email *'}</span>
                <input type="email" placeholder="Email Address" />
              </label>
              <label className="form-field col-12 col-lg-6">
                <span>{'Phone Number*'}</span>
                <input type="tel" placeholder="Phone Number" />
              </label>
              <label className="form-field col-12">
                <span>{'Leave A Message'}</span>
                <textarea placeholder="Message" />
              </label>
              <div className="form-submit submit-btn col-12">
                <button type="button" className="main-btn">
                  {'Send'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div className="contacts-map">
      <div className="container">
        <div className="map-wrap">
          <div id="google-map" />
        </div>
      </div>
    </div>
  </>
);

export default ContactUs;
