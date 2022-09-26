/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import classNames from 'classnames'
import countryList from 'react-select-country-list'

import Accordion from '@/components/elements/accordion'
import RadioElement from '@/components/elements/radioElement'

interface Props {
  values: Record<string, string>
  onChange: (q: string, a: string) => void
}

interface IQuestion {
  question: string
  answers: {
    label: string
    value: string
  }[]
}

const questions: IQuestion[] = [
  {
    question: 'Which passport are you applying for?',
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
    answers: countryList().getData(),
  },
]

const ExpeditingServiceQuestions: React.FC<Props> = ({ values, onChange }) => (
  <div className="expediting-service-questions">
    <div className="pb-3 expediting-service-question-title">
      To better assist you please complete the following
    </div>
    {questions.map((q, qIndex) => (
      <Accordion
        key={`q-${qIndex}`}
        className="expediting-accordion"
        renderRight={() => (
          <div
            className={classNames('expediting-icon', {
              question: !values[q.question],
            })}>
            {values[q.question] ? '🗸' : '?'}
          </div>
        )}
        title={q.question}>
        <div className="form-fields">
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
                onSelect={(v: string) => onChange(q.question, v)}
              />
            </div>
          ))}
        </div>
      </Accordion>
    ))}
  </div>
)

export default ExpeditingServiceQuestions
