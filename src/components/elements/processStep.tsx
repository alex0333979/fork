import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import { humanizeTime } from '@/utils'

export interface ProcessStepProps {
  title: string
  step: number
  completeStep: number
  steps: {
    name: string
    step: number
    link: string
    fieldsCount?: number
  }[]
}

const timePerInput = 7 // seconds
const completePercentage = 295 // %

const ProcessStep: React.FC<ProcessStepProps> = ({
  step,
  completeStep,
  steps,
}) => {
  const [percentage, setPercentage] = useState<number>(0)
  const router = useRouter()
  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setPercentage(0)
  }, [step])

  const onClickStep = useCallback(
    async (s: { name: string; step: number; link: string }) => {
      if (s.step < completeStep + 2) {
        await router.push(s.link)
      }
    },
    [completeStep, router],
  )

  const totalTime = useMemo(() => {
    const curStep = steps.find((s) => s.step === step)

    const fieldsCount = curStep?.fieldsCount || 0
    if (!percentage) {
      setPercentage(completePercentage / fieldsCount)
    }
    return fieldsCount * timePerInput
  }, [percentage, step, steps])

  useEffect(() => {
    if (totalTime) {
      timer.current = setInterval(() => {
        setPercentage((p) =>
          Math.min(
            completePercentage,
            p + completePercentage / (totalTime / 7),
          ),
        )
      }, 7000)
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current)
      }
    }
  }, [totalTime])

  useEffect(() => {
    if (percentage >= completePercentage && timer.current) {
      clearInterval(timer.current)
    }
  }, [percentage])

  return (
    <div className="progress-wrap">
      {/* <h2>{title}</h2>*/}
      <ul>
        {steps.map((s, index) => (
          <li
            key={index}
            className={classNames({
              done: s.step < step,
              current: s.step === step,
            })}
            onClick={() => onClickStep(s)}>
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
                      s.step < step
                        ? '295%,1000'
                        : s.step === step
                        ? `${percentage}%,1000`
                        : '0%,1000'
                    }
                    strokeDashoffset="0"
                  />
                </svg>
              </span>
              <span className="index" />
            </div>
            <div className="name">
              <h4>{s.name}</h4>
              <p>
                {s.step < step
                  ? 'Done'
                  : totalTime
                  ? `On progress ≈ ${humanizeTime(totalTime)}`
                  : `On progress`}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProcessStep
