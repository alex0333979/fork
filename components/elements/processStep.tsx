import React from 'react';
import classNames from 'classnames';

export interface ProcessStepProps {
  title: string;
  step: number;
  steps: {
    name: string;
    step: number;
  }[];
}

const ProcessStep: React.FC<ProcessStepProps> = ({ title, step, steps }) => (
  <div className="progress-wrap">
    <h2>{title}</h2>
    <ul>
      {steps.map((s, index) => (
        <li
          key={index}
          className={classNames({
            done: s.step < step,
            current: s.step === step
          })}>
          <div className="counter">
            <span className="line">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r="22.5"
                  fill="transparent"
                  strokeWidth="3"
                  strokeDasharray={
                    s.step < step ? '295%,1000' : s.step === step ? '295%,1000' : '0%,1000'
                  }
                  strokeDashoffset="0"
                />
              </svg>
            </span>
            <span className="index" />
          </div>
          <div className="name">
            <h4>{s.name}</h4>
            <p>{s.step < step ? 'Done' : 'On progress'}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ProcessStep;
