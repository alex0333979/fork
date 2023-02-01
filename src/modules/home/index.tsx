import React, { useCallback, useEffect, useState } from 'react'
import { SliceZone } from '@prismicio/react'

import { components } from 'slices'

import { HomePageProps } from '@/pages'
import { useApp } from '@/hooks'
import MainIntro from './mainIntro'
import WorkingProcess from 'slices/working_process'
import FaqForm from './faqForm'
// import RequirementBox from './requirements'

type WorkingProcessInterface = React.ElementRef<typeof WorkingProcess>

const Home: React.FC<HomePageProps> = ({
  country,
  document,
  title,
  description,
  buttonTitle,
  // extraPath,
  page,
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
        page={page}
        open={openDocument}
        onStartNow={onStartNow}
        country={country}
        document={document}
        title={title}
        description={description}
        buttonTitle={buttonTitle}
      />
      {/* 
      {country && document && (
        <RequirementBox
          country={country}
          document={document}
          extraPath={extraPath}
        />
      )}
      */}
      <SliceZone slices={page?.data.slices} components={components} />
      <FaqForm />
    </>
  )
}

export default Home
