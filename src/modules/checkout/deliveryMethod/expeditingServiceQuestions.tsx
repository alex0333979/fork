/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useRef, useState } from 'react'
import classNames from 'classnames'
import countryList from 'react-select-country-list'

import RadioElement from '@/components/elements/radioElement'
import { useClickOutside } from '@/hooks'

interface Props {
  values: Record<string, string>
  onChange: (q: string, a: string) => void
}

interface QuestionRowProps {
  q: IQuestion
  qIndex: number
  opened: boolean
  values: Record<string, string>
  onToggle: (index: number, close?: boolean) => void
  onChange: (q: string, a: string) => void
}

interface IQuestion {
  question: string
  placeholder: string
  answers: {
    label: string
    value: string
  }[]
}

const questions: IQuestion[] = [
  {
    question: 'Which passport are you applying for?',
    placeholder: 'Select passport',
    answers: [
      {
        label: 'New Passport (DS-11 Form)',
        value: 'New Passport (DS-11 Form)',
      },
      {
        label: 'Passport Renewal (DS-82 Form)',
        value: 'Passport Renewal (DS-82 Form)',
      },
      {
        label: 'Visa',
        value: 'Visa',
      },
    ],
  },
  {
    question: 'How Soon do you need your passport / Visa?',
    placeholder: 'Select the period',
    answers: [
      {
        label: 'Within 72 hours',
        value: 'Within 72 hours',
      },
      {
        label: 'Within 1 week',
        value: 'Within 1 week',
      },
      {
        label: 'Within 2 weeks',
        value: 'Within 2 weeks',
      },
      {
        label: 'Within 4 weeks',
        value: 'Within 4 weeks',
      },
    ],
  },
  {
    question: 'Do you have proof of travel / itinerary?',
    placeholder: 'Select proof',
    answers: [
      {
        label: 'Flight itinerary',
        value: 'Flight itinerary',
      },
      {
        label: 'Hotel reservation',
        value: 'Hotel reservation',
      },
      {
        label: 'Cruise ticket',
        value: 'Cruise ticket',
      },
      {
        label: 'A letter from my employer',
        value: 'Other',
      },
    ],
  },
  {
    question: 'Travel Destination',
    placeholder: 'Select country',
    answers: countryList().getData(),
  },
]

const QuestionRow: React.FC<QuestionRowProps> = ({
  q,
  qIndex,
  opened,
  values,
  onToggle,
  onChange,
}) => {
  const questionRef = useRef<HTMLDivElement>(null)

  useClickOutside(questionRef, () => {
    onToggle(qIndex, true)
  })

  return (
    <div className="group">
      <div className="group-label">
        <p>{`${qIndex + 1}. ${q.question}`}</p>
      </div>
      <div
        ref={questionRef}
        className={classNames('group-select', {
          open: opened,
        })}>
        <div className="label" onClick={() => onToggle(qIndex)}>
          <p>{values[q.question] || q.placeholder}</p>
        </div>
        <div className="option">
          {q.answers.map((a, aIndex) => (
            <div key={`a-${aIndex}`} className="expediting-answers">
              <RadioElement<string>
                className={classNames('expediting-answer-option', {
                  // @ts-ignore
                  'option-selected': values[q.question] === a.value,
                })}
                label={a.label}
                name={q.question}
                // @ts-ignore
                selected={values[q.question] === a.value}
                value={a.value}
                onSelect={(v: string) => {
                  onToggle(qIndex)
                  onChange(q.question, v)
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ExpeditingServiceQuestions: React.FC<Props> = ({ values, onChange }) => {
  const [opened, setOpened] = useState<number[]>([])

  const onToggle = useCallback(
    (index: number, close?: boolean) => {
      if (close) {
        setOpened(opened.filter((o) => o !== index))
      } else {
        const isOpened = opened.includes(index)
        if (isOpened) setOpened(opened.filter((o) => o !== index))
        if (!isOpened) setOpened([...opened, index])
      }
    },
    [opened],
  )

  return (
    <div className="form-fields">
      <div className="select-list">
        {questions.map((q, qIndex) => (
          <QuestionRow
            key={`q-${qIndex}`}
            q={q}
            qIndex={qIndex}
            opened={opened.includes(qIndex)}
            values={values}
            onToggle={onToggle}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  )
}

export default ExpeditingServiceQuestions
