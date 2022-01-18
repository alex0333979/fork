import React, {
  ReactNode,
  useEffect,
  useCallback,
  useState,
  useRef,
  useImperativeHandle
} from 'react';
import Image from 'next/image';
import { scrollToTop } from '@/lib/utils/scrollToTop';

const PROCESS_DATA = [
  {
    label: 'Take your photo',
    description: <p>{`Take or Upload a Photo With Your Mobile or PC`}</p>
  },
  {
    label: 'AI Software Photo Scan',
    description: (
      <p>{`Our Biometric Software Will Scan and Verify Your Photo for Government Compliance`}</p>
    )
  },
  {
    label: `Photo Compliance`,
    description: (
      <p>
        {`Our Technology Map Your Facial Features and Then Reposition, Size, Crop and Clean Up the Background of Your Shot`}
      </p>
    )
  },
  {
    label: `Delivery`,
    description: <p>{`We’ll Then Print and Ship Them to You or You May Print Them at Home`}</p>
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

interface ChildInterface {
  startWorkingProcess: () => void;
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

export interface WorkingProcessProps {
  onEndRunning: () => void;
  setOpen: React.Dispatch<boolean>;
}

const WorkingProcess: React.ForwardRefRenderFunction<ChildInterface, WorkingProcessProps> = (
  { onEndRunning, setOpen },
  ref
) => {
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
              onEndRunning();
              clearInterval(timeIntervalId.current);
            }
          } else {
            startProcess(a);
          }
        }, 10000);
      }
    },
    [onEndRunning, startProcess]
  );

  useImperativeHandle(
    ref,
    () => ({
      startWorkingProcess() {
        onClickItem(0);
      }
    }),
    [onClickItem]
  );

  return (
    <div className="working-process">
      <div className="container">
        <div className="data-wrap">
          <div className="sub-title">
            <h2>{'How Our Process Works?'}</h2>
            <p>{'Biometrically approved photos'}</p>
          </div>
          <div className="process-wrap">
            <div className="process-list">
              <div className="list-wrap">
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
              <div className="start-btn">
                <button
                  className="main-btn big"
                  onClick={() => {
                    scrollToTop();
                    setOpen(true);
                  }}>{`Start Now`}</button>
              </div>
            </div>
            <div className="process-img">
              <span>
                <Image
                  src="/images/up-sale-new.png"
                  layout={'fill'}
                  priority={true}
                  placeholder="empty"
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(WorkingProcess);
