import React, { ReactNode, useEffect, useCallback, useState, useRef } from 'react';

const PROCESS_DATA = [
  {
    label: 'Taking a photo with your mobile device(or your PC)',
    description: (
      <p>
        {`Keep taking shots until you're happy with the results. Each photo is instantly
                    biometrically approved to comply with U.S. department of State guidelines.`}
        <br />
        <br />
        {`Once you've chosen the perfect shot, print them out yourself or take advantage
                    of our concierge service. We'll print and ship them directly to you.`}
      </p>
    )
  },
  {
    label: 'Your data secure by TradeMark of cyber',
    description: (
      <p>
        {`Keep taking shots until you're happy with the results. Each photo is instantly
                    biometrically approved to comply with U.S. department of State guidelines`}
      </p>
    )
  },
  {
    label: `Percentage of success in 7 years (100%) if not, money back guarantee.`,
    description: (
      <p>
        {`Once you've chosen the perfect shot, print them out yourself or take advantage
                    of our concierge service. We'll print and ship them directly to you.`}
      </p>
    )
  }
];

const initialData = [
  { active: false, past: false, loaded: false, reset: false },
  { active: false, past: false, loaded: false, reset: false },
  { active: false, past: false, loaded: false, reset: false }
];

interface ProcessItemProps {
  label: string;
  description: ReactNode;
  active: boolean;
  past: boolean;
  loaded: boolean;
  reset: boolean;
  onClick: () => void;
}

const ProcessItem: React.FC<ProcessItemProps> = ({
  label,
  description,
  active,
  past,
  loaded,
  reset,
  onClick
}) => (
  <li
    data-active={active}
    data-past={past}
    data-loaded={loaded}
    data-reset={reset}
    onClick={onClick}>
    <div className="progress">
      <span className="progress-track" />
      <span className="progress-bar" />
      <span className="progress-bullet" />
    </div>
    <div className="label">
      <h3>{label}</h3>
    </div>
    <div className="description">{description}</div>
  </li>
);

const WorkingProcess: React.FC = () => {
  const [data, setData] =
    useState<{ active: boolean; past: boolean; loaded: boolean; reset: boolean }[]>(initialData);

  const timeIntervalId = useRef<NodeJS.Timeout | undefined>();
  const timeOutId = useRef<NodeJS.Timeout | undefined>();
  const resetProcess = useCallback(() => {
    const b = data.map((a) => {
      a.active = false;
      a.loaded = false;
      a.past = false;
      a.reset = true;
      return a;
    });
    setData(b);
  }, [data]);

  const runProcess = useCallback(
    (index: number) => {
      const c = data.map((a, i) => {
        if (i < index) {
          a.active = false;
          a.loaded = true;
          a.past = true;
        } else if (index === i) {
          a.active = true;
          a.loaded = true;
          a.past = false;
        } else {
          a.active = false;
          a.loaded = false;
          a.past = false;
        }
        a.reset = false;
        return a;
      });
      setData(c);
    },
    [data]
  );

  useEffect(
    () => () => {
      if (timeIntervalId.current) {
        clearInterval(timeIntervalId.current);
      }
      if (timeOutId.current) {
        clearTimeout(timeOutId.current);
      }
    },
    []
  );

  const startProcess = useCallback(
    (index: number) => {
      resetProcess();
      timeOutId.current = setTimeout(() => {
        runProcess(index);
      }, 300);
    },
    [resetProcess, runProcess]
  );

  const onClickItem = useCallback(
    (index: number) => {
      if (timeIntervalId.current) {
        clearInterval(timeIntervalId.current);
      }
      startProcess(index);
      let a = index;
      if (index < initialData.length - 1) {
        timeIntervalId.current = setInterval(() => {
          a += 1;
          if (a === initialData.length) {
            if (timeIntervalId.current) {
              clearInterval(timeIntervalId.current);
            }
          } else {
            startProcess(a);
          }
        }, 10000);
      }
    },
    [startProcess]
  );

  return (
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
                {PROCESS_DATA.map((process, index) => (
                  <ProcessItem
                    key={index}
                    label={process.label}
                    description={process.description}
                    active={data[index].active}
                    past={data[index].past}
                    loaded={data[index].loaded}
                    reset={data[index].reset}
                    onClick={() => onClickItem(index)}
                  />
                ))}
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
};

export default WorkingProcess;
