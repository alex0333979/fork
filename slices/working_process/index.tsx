/* eslint-disable max-len */
import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  useImperativeHandle,
} from 'react'
import { PrismicRichText } from '@prismicio/react'
import NextImage from 'next/image'

import { scrollToTop } from '@/utils'
import { PrismicNextImage } from '@prismicio/next'
import Image from 'next/image'
import { imageLoader } from '@/modules/about/summary'

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
  slice?: any
  onClick: () => void
  context?: any
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
  slice,
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
    <div className="label prismic-content">
      <PrismicRichText field={slice.items[index].process_label} />
    </div>
    <div className="description prismic-content">
      <PrismicRichText field={slice.items[index].process_description} />
    </div>
  </li>
)

export interface WorkingProcessProps {
  slice: any
  context?: any
}

const WorkingProcess: React.ForwardRefRenderFunction<
  ChildInterface,
  WorkingProcessProps
> = ({ slice, context }) => {
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
              context?.onEndRunning()
              clearInterval(timeIntervalId.current)
            }
          } else {
            startProcess(a)
          }
        }, 10000)
      }
    },
    [context, startProcess],
  )

  useImperativeHandle(
    context?.ref,
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
          <div className="sub-title prismic-content">
            <PrismicRichText field={slice.primary.process_title} />
            <PrismicRichText field={slice.primary.process_text} />
          </div>
          <div className="process-wrap">
            <div className="process-list">
              <div className="list-wrap">
                <ul>
                  {slice.items.map((_item: object, index: number) => (
                    <ProcessItem
                      key={index}
                      index={index}
                      slice={slice}
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
                  className="main-btn big prismic-content"
                  onClick={() => {
                    scrollToTop()
                    context?.onStartNow?.(true)
                  }}>
                  <PrismicRichText field={slice.primary.process_button} />
                </button>
              </div>
            </div>

            <div className="process-img">
              <span>
                {slice?.primary.process_image && (
                  <Image
                    src={slice?.primary.process_image.url}
                    width={slice?.primary.process_image.dimensions.width}
                    height={slice?.primary.process_image.dimensions.height}
                    loader={imageLoader}
                    alt=""
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.forwardRef(WorkingProcess)
