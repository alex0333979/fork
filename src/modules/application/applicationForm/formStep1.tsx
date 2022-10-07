import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import { PAGES } from '@/constants'
import { FormStep1Props } from './types'

const FormStep1: React.FC<FormStep1Props> = ({ forms, entry }) => {
  const router = useRouter()

  const onSelectForm = useCallback(
    (formId: string) => {
      router.push(`${PAGES.application.create}?formId=${formId}`).then()
    },
    [router],
  )

  return (
    <div className="form-fields">
      <div className="extra-info">
        <h3>Before start, please select an application type</h3>
      </div>
      <div className="group">
        {forms.map((form, index) => (
          <label
            key={index}
            className={classNames({
              'third-size': forms.length > 2,
              'half-size': !(forms.length > 2),
            })}>
            <span className="field radio">
              <span className="name">
                <b>{form.name}</b>
                <i className="icon-about" />
              </span>
              <span className="extra">{form.description}</span>
              <input
                type="radio"
                name="application"
                checked={form.id === entry.formId}
                onChange={() => onSelectForm(form.id)}
              />
              <span className="wrap">
                <span className="bullet" />
                <span className="border" />
              </span>
            </span>
            <span className="warning">Warning message</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default FormStep1
