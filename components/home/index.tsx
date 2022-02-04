import React, { useCallback, useEffect, useState } from 'react';
import MainIntro from '@/components/home/mainIntro';
import WorkingProcess from '@/components/home/workingProcess';
import FaqForm from '@/components/home/faqForm';
import ReviewsPlatform from '@/components/home/reviewsPlatform';
import HowTakePhoto from '@/components/home/howTakePhoto';
import { HomePageProps } from '@/pages/index';
import RequirementBox from '@/components/home/requirements';
import { useAuth } from '@/lib/auth';

type WorkingProcessInterface = React.ElementRef<typeof WorkingProcess>;

const Home: React.FC<HomePageProps> = ({ country, document }) => {
  const target = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<WorkingProcessInterface>(null);
  const [running, setRunning] = useState<boolean>(false);
  const { openDocument, setOpenDocument } = useAuth();

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
      <MainIntro
        ref={target}
        open={openDocument}
        setOpen={setOpenDocument}
        country={country}
        document={document}
      />
      <WorkingProcess ref={ref} onEndRunning={() => setRunning(false)} setOpen={setOpenDocument} />
      {country && document && <RequirementBox country={country} document={document} />}
      <ReviewsPlatform setOpen={setOpenDocument} />
      <HowTakePhoto />
      {/* <FaqSection setOpen={setOpen} />*/}
      <FaqForm />
    </>
  );
};

export default Home;
