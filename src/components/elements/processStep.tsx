import React, { useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import { humanizeTime } from '@/utils'

export interface IStep {
  name: string
  step: number
  link: string
  fieldsCount?: number
  completedFields?: number
}
export interface ProcessStepsProps {
  title: string
  step: number
  completeStep: number
  steps: IStep[]
}

interface ProcessStepProps {
  isDone: boolean
  isCurrent: boolean
  step: IStep
  onClickStep: (s: IStep) => void
}

const timePerInput = 7 // seconds
const completePercentage = 295 // %

const ProgressStep: React.FC<ProcessStepProps> = ({
  isDone,
  isCurrent,
  step,
  onClickStep,
}) => {
  const [percentage, setPercentage] = useState<number>(0)

  const totalTime = useMemo(() => {
    if (!isCurrent || !step?.fieldsCount) return 0

    const fieldsToComplete = step.fieldsCount - (step.completedFields || 0)
    if (!percentage) {
      setPercentage(completePercentage / step.fieldsCount)
    }
    return fieldsToComplete * timePerInput
  }, [percentage, step, isCurrent])

  useEffect(() => {
    if (step.fieldsCount) {
      setPercentage(
        ((step.completedFields || 0) * completePercentage) / step.fieldsCount,
      )
    } else {
      setPercentage(59)
    }
  }, [step.completedFields, step.fieldsCount])

  return (
    <li
      className={classNames({
        done: isDone,
        current: isCurrent,
      })}
      onClick={() => onClickStep(step)}>
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
                isDone
                  ? '295%,1000'
                  : isCurrent
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
        <h4>{step.name}</h4>
        <p>
          {isDone
            ? 'Done'
            : totalTime
            ? `On progress ≈ ${humanizeTime(totalTime)}`
            : `On progress`}
        </p>
      </div>
    </li>
  )
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({
  step,
  completeStep,
  steps,
}) => {
  const router = useRouter()

  const onClickStep = useCallback(
    async (s: IStep) => {
      if (s.step < completeStep + 2) {
        await router.push(s.link)
      }
    },
    [completeStep, router],
  )

  return (
    <div className="progress-wrap">
      {/* <h2>{title}</h2>*/}
      <ul>
        {steps.map((s, index) => (
          <ProgressStep
            key={index}
            isDone={s.step < step}
            isCurrent={s.step === step}
            step={s}
            onClickStep={onClickStep}
          />
        ))}
      </ul>
    </div>
  )
}

export default ProcessSteps
