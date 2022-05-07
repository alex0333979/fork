import React, { useCallback, useEffect, useState } from 'react'
import { FormField } from '@/generated/graphql'
import classNames from 'classnames'

interface SelectBoxProps {
  formField: FormField
  onValueChange: (name: string, value: string | number) => void
  error: string | undefined
}

const SelectBox: React.FC<SelectBoxProps> = ({
  formField,
  onValueChange,
  error,
}) => {
  const [value, setValue] = useState<string | number>('default')

  useEffect(() => {
    setValue(formField.value ?? formField.defaultValue ?? 'default')
    if (!formField.value && formField.defaultValue !== undefined) {
      onValueChange(formField.name, formField.defaultValue)
    }
  }, [formField.defaultValue, formField.name, formField.value, onValueChange])

  const onChange = useCallback(
    (value: string | number) => {
      onValueChange(formField.name, value)
      setValue(value)
    },
    [formField.name, onValueChange],
  )

  return (
    <label className="half-size">
      <span className="label">
        {formField.text}
        {formField.required ? ' *' : ''}
      </span>
      <span className="more">
        <span className="field select">
          <select
            name={formField.name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={classNames({
              'error-border': !!error,
            })}>
            <option value="default" disabled hidden>
              {formField.placeholder ?? ''}
            </option>
            {formField.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </span>
      </span>
      {error ? <span className="attention">{error}</span> : <></>}
    </label>
  )
}

export default SelectBox
