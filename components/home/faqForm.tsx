import React from 'react';

const FaqForm: React.FC = () => (
  <div className="faq-form">
    <div className="container">
      <div className="data-wrap">
        <div className="form-wrap">
          <div className="sub-title">
            <h2>{'Have a question?'}</h2>
            <p>{'Biometrically approved photos'}</p>
          </div>
          <form>
            <div className="form-fields">
              <label className="half-size">
                <span className="label">{'Your name'}</span>
                <span className="field">
                  <input type="text" placeholder="Your name" />
                </span>
                <span className="warning">{'Warning message'}</span>
              </label>
              <label className="half-size">
                <span className="label">{'Your E-mail'}</span>
                <span className="field">
                  <input type="email" placeholder="Your E-mail" />
                </span>
              </label>
              <label className="full-size">
                <span className="label">Your question</span>
                <span className="field">
                  <textarea placeholder="Your question" />
                </span>
              </label>
            </div>

            <div className="submit-btn">
              <button type="button" className="main-btn big">
                {'Send'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default FaqForm;
