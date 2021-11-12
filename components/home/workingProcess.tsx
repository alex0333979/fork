import React, { ReactNode, useEffect, useCallback, useState, useRef } from 'react';
import Image from 'next/image';

const PROCESS_DATA = [
  {
    label: '100% Online',
    description: (
      <p>
        {`No need to stand in line to get your passport photo. Take your passport photo using your mobile or PC and we will print and ship it to your home.`}
      </p>
    )
  },
  {
    label: 'Guaranteed Government Compliance',
    description: (
      <p>
        {`Our AI (Artificial Intelligence) Verifies And, As Long As You've Complied With Our Simple Photo Instructions, Your Passport Photo will be Approved or we provide 100% money back guaranteed.`}
      </p>
    )
  },
  {
    label: `Passport Photos Your Way`,
    description: (
      <p>
        {`Keep Taking Shots Until You're Happy With The Results. Each Photo Is Instantly Biometrically Scanned To Comply With Government Guidelines. Once You've Chosen The Perfect Shot, Print Them Out Yourself Or Take Advantage Of Our Concierge Service. We'll Print And Ship Them Directly To You.`}
      </p>
    )
  },
  {
    label: `Photo Approval via AI Software`,
    description: (
      <p>
        {`Each required photo attribute is scanned for accuracy. We confirm that your eyes are in fact open, insure the appropriate background is being used, your head and body position are meeting Government standards, and more. All data points are scanned and either approved or rejected within seconds.`}
      </p>
    )
  },
  {
    label: `Facial Feature & Background Attributes`,
    description: (
      <p>
        {`Our biometric technology is used to map facial features and background suitability from the photo you have either uploaded or taken using our built-in camera interface. No need to download an app. Use your phone or PC, it's that simple.`}
      </p>
    )
  }
];

const initialData = [
  { active: false, past: false, loaded: false, reset: false },
  { active: false, past: false, loaded: false, reset: false },
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
    setData(
      data.map((a) => {
        a.active = false;
        a.loaded = false;
        a.past = false;
        a.reset = true;
        return a;
      })
    );
  }, [data]);

  const runProcess = useCallback(
    (index: number) => {
      setData(
        data.map((a, i) => {
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
        })
      );
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
      timeOutId.current = setTimeout(() => runProcess(index), 300);
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
            <h2>{'How our technology works?'}</h2>
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
              <span>
                <Image src="/images/process.png" width={429} height={388} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingProcess;
