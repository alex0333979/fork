/* eslint-disable max-len */
import React, {
  ReactNode,
  useEffect,
  useCallback,
  useState,
  useRef,
  useMemo,
  useImperativeHandle,
} from 'react'
import Image from 'next/image'
import { PrismicDocument, RTNode } from '@prismicio/types'
import { scrollToTop } from '@/utils'
import { IProcessDatum } from '@/types'
import { ProcessData } from './constant'
import { ExtraPathMap } from '@/constants'
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'

const initialData = [
  { active: false, past: false, loaded: false, reset: false },
  { active: false, past: false, loaded: false, reset: false },
  { active: false, past: false, loaded: false, reset: false },
  { active: false, past: false, loaded: false, reset: false },
  { active: false, past: false, loaded: false, reset: false },
]

interface ProcessItemProps {
  active: boolean
  past: boolean
  loaded: boolean
  reset: boolean
  index: number
  page?: PrismicDocument<Record<string, any>, string, string>
  onClick: () => void
}

interface ChildInterface {
  startWorkingProcess: () => void
}

const ProcessItem: React.FC<ProcessItemProps> = ({
  active,
  past,
  loaded,
  reset,
  index,
  page,
  onClick,
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
      <h3><PrismicRichText field={page?.data.slices[0].items[index].process_label}/></h3>
    </div>
    <div className="description"><PrismicRichText field={page?.data.slices[0].items[index].process_description}/></div>
  </li>
)

export interface WorkingProcessProps {
  extraPath?: string | null
  onEndRunning: () => void
  onStartNow: (isOpen?: boolean) => void
  page?: PrismicDocument<Record<string, any>, string, string>
}

const WorkingProcess: React.ForwardRefRenderFunction<
  ChildInterface,
  WorkingProcessProps
> = ({ extraPath, onEndRunning, onStartNow, page }, ref) => {
  const [data, setData] =
    useState<
      { active: boolean; past: boolean; loaded: boolean; reset: boolean }[]
    >(initialData)

  const timeIntervalId = useRef<NodeJS.Timeout | undefined>()
  const timeOutId = useRef<NodeJS.Timeout | undefined>()

  const resetProcess = useCallback(() => {
    setData(
      data.map((a) => {
        a.active = false
        a.loaded = false
        a.past = false
        a.reset = true
        return a
      }),
    )
  }, [data])

  const runProcess = useCallback(
    (index: number) => {
      setData(
        data.map((a, i) => {
          if (i < index) {
            a.active = false
            a.loaded = true
            a.past = true
          } else if (index === i) {
            a.active = true
            a.loaded = true
            a.past = false
          } else {
            a.active = false
            a.loaded = false
            a.past = false
          }
          a.reset = false
          return a
        }),
      )
    },
    [data],
  )

  useEffect(
    () => () => {
      if (timeIntervalId.current) {
        clearInterval(timeIntervalId.current)
      }
      if (timeOutId.current) {
        clearTimeout(timeOutId.current)
      }
    },
    [],
  )

  const startProcess = useCallback(
    (index: number) => {
      resetProcess()
      timeOutId.current = setTimeout(() => runProcess(index), 300)
    },
    [resetProcess, runProcess],
  )

  const onClickItem = useCallback(
    (index: number) => {
      if (timeIntervalId.current) {
        clearInterval(timeIntervalId.current)
      }
      startProcess(index)
      let a = index
      if (index < initialData.length - 1) {
        timeIntervalId.current = setInterval(() => {
          a += 1
          if (a === initialData.length) {
            if (timeIntervalId.current) {
              onEndRunning()
              clearInterval(timeIntervalId.current)
            }
          } else {
            startProcess(a)
          }
        }, 10000)
      }
    },
    [onEndRunning, startProcess],
  )

  const processData: IProcessDatum[] = useMemo(() => {
    let _processData = ProcessData.default
    if (
      extraPath === ExtraPathMap.CanadianPassportAtHome ||
      extraPath === ExtraPathMap.CanadianPassportPhoto
    ) {
      _processData = ProcessData[extraPath]
    }

    return _processData
  }, [extraPath])

  useImperativeHandle(
    ref,
    () => ({
      startWorkingProcess() {
        onClickItem(0)
      },
    }),
    [onClickItem],
  )

  return (
    <div className="working-process">
      <div className="container">
        <div className="data-wrap">
          <div className="sub-title">
            <h2><PrismicRichText field={page?.data.slices[0].primary.process_title} /></h2>
            <p><PrismicRichText field={page?.data.slices[0].primary.process_text} /></p>
          </div>
          <div className="process-wrap">
            <div className="process-list">
              <div className="list-wrap">
                <ul>
                  {processData.map((process, index) => (
                    <ProcessItem
                      key={index}
                      index={index}
                      page={page}
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
                    scrollToTop()
                    onStartNow(true)
                  }}><PrismicRichText field={page?.data.slices[0].primary.process_button} /></button>
              </div>
            </div>
            
            <div className="process-img">
              <span>
                <PrismicNextImage field={page?.data.slices[0].primary.process_image} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.forwardRef(WorkingProcess)
