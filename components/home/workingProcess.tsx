import React from 'react';

const WorkingProcess: React.FC = () => (
  <div className="working-process">
    <div className="container">
      <div className="data-wrap">
        <div className="sub-title">
          <h2>{'How our technology works'}</h2>
          <p>{'Biometrically approved photos'}</p>
        </div>
        <div className="process-wrap">
          <div className="process-list">
            <ul>
              <li data-active="false" data-past="false" data-loaded="false" data-reset="false">
                <div className="progress">
                  <span className="progress-track" />
                  <span className="progress-bar" />
                  <span className="progress-bullet" />
                </div>
                <div className="label">
                  <h3> {'Taking a photo with your mobile device(or your PC)'}</h3>
                </div>
                <div className="description">
                  <p>
                    {`Keep taking shots until you're happy with the results. Each photo is instantly
                    biometrically approved to comply with U.S. department of State guidelines.`}
                    <br />
                    <br />
                    {`Once you've chosen the perfect shot, print them out yourself or take advantage
                    of our concierge service. We'll print and ship them directly to you.`}
                  </p>
                </div>
              </li>
              <li data-active="false" data-past="false" data-loaded="false" data-reset="false">
                <div className="progress">
                  <span className="progress-track" />
                  <span className="progress-bar" />
                  <span className="progress-bullet" />
                </div>
                <div className="label">
                  <h3>{'Your data secure by TradeMark of cyber'}</h3>
                </div>
                <div className="description">
                  <p>
                    {`Keep taking shots until you're happy with the results. Each photo is instantly
                    biometrically approved to comply with U.S. department of State guidelines`}
                  </p>
                </div>
              </li>
              <li data-active="false" data-past="false" data-loaded="false" data-reset="false">
                <div className="progress">
                  <span className="progress-track" />
                  <span className="progress-bar" />
                  <span className="progress-bullet" />
                </div>
                <div className="label">
                  <h3>{`Percentage of sucsuess in 7 years (100%) if not, money back guarantee.`}</h3>
                </div>
                <div className="description">
                  <p>
                    {`Once you've chosen the perfect shot, print them out yourself or take advantage
                    of our concierge service. We'll print and ship them directly to you.`}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="process-img">
            <span />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WorkingProcess;
