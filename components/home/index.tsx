import React, { useCallback, useEffect, useState } from 'react';
import MainIntro from '@/components/home/mainIntro';
import WorkingProcess from '@/components/home/workingProcess';
import FaqForm from '@/components/home/faqForm';
import ReviewsPlatform from '@/components/home/reviewsPlatform';
import HowTakePhoto from '@/components/home/howTakePhoto';
import { HomePageProps } from '@/pages/index';

type WorkingProcessInterface = React.ElementRef<typeof WorkingProcess>;

const Home: React.FC<HomePageProps> = ({ document }) => {
  const target = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<WorkingProcessInterface>(null);
  const [running, setRunning] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const listenScrollEvent = useCallback(() => {
    const clientHeight = target?.current?.clientHeight;
    if (clientHeight) {
      if (window.scrollY > clientHeight && !running) {
        setRunning(true);
        ref?.current?.startWorkingProcess();
      }
    }
  }, [running]);

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
    return () => window.removeEventListener('scroll', listenScrollEvent);
  }, [listenScrollEvent]);

  return (
    <>
      <MainIntro ref={target} open={open} setOpen={setOpen} document={document} />
      <WorkingProcess ref={ref} onEndRunning={() => setRunning(false)} setOpen={setOpen} />
      <ReviewsPlatform setOpen={setOpen} />
      <HowTakePhoto />
      {/* <FaqSection setOpen={setOpen} />*/}
      <FaqForm />
    </>
  );
};

export default Home;
