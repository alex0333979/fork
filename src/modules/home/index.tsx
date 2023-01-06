import React, { useCallback, useEffect, useState } from 'react'

import { HomePageProps } from '@/pages'
import { useApp } from '@/hooks'
import MainIntro from './mainIntro'
import WorkingProcess from './workingProcess'
import FaqForm from './faqForm'
import ReviewsPlatform from './reviewsPlatform'
import RequirementBox from './requirements'
import FaqSection from './faqSection'

type WorkingProcessInterface = React.ElementRef<typeof WorkingProcess>

const Home: React.FC<HomePageProps> = ({
  country,
  document,
  title,
  description,
  buttonTitle,
  extraPath,
  onStart,
}) => {
  const target = React.useRef<HTMLDivElement>(null)
  const ref = React.useRef<WorkingProcessInterface>(null)
  const [running, setRunning] = useState<boolean>(false)
  const { openDocument, setOpenDocument } = useApp()

  const listenScrollEvent = useCallback(() => {
    const clientHeight = target?.current?.clientHeight
    if (clientHeight) {
      if (window.scrollY > clientHeight && !running) {
        setRunning(true)
        ref?.current?.startWorkingProcess()
      }
    }
  }, [running])

  const onStartNow = useCallback(
    (isOpen?: boolean) => {
      if (onStart) onStart()
      else setOpenDocument(Boolean(isOpen))
    },
    [onStart, setOpenDocument],
  )

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent)
    return () => window.removeEventListener('scroll', listenScrollEvent)
  }, [listenScrollEvent])

  return (
    <>
      <MainIntro
        ref={target}
        open={openDocument}
        onStartNow={onStartNow}
        country={country}
        document={document}
        title={title}
        description={description}
        buttonTitle={buttonTitle}
      />
      <WorkingProcess
        ref={ref}
        extraPath={extraPath}
        onEndRunning={() => setRunning(false)}
        onStartNow={onStartNow}
      />
      {country && document && (
        <RequirementBox
          country={country}
          document={document}
          extraPath={extraPath}
        />
      )}
      <ReviewsPlatform onStartNow={onStartNow} />
      <FaqSection country={country} extraPath={extraPath} />
      <FaqForm />
    </>
  )
}

export default Home
