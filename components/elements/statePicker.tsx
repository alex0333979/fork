import React, { useCallback, useEffect, useState } from 'react'
import { FormField } from '@/generated/graphql'
import { RegionDropdown } from 'react-country-region-selector'
import classNames from 'classnames'

interface StatePickerProps {
  formField: FormField
  country: string
  selectedState: (name: string, country: string) => void
  error: string | undefined
}

const StatePicker: React.FC<StatePickerProps> = ({
  formField,
  country,
  selectedState,
  error,
}) => {
  const [state, setState] = useState<string>('')

  useEffect(() => {
    setState(formField.value ?? '')
  }, [formField.value])

  const selectState = useCallback(
    (state: string) => {
      selectedState(formField.name, state)
      setState(state)
    },
    [formField.name, selectedState],
  )

  return (
    <label className="half-size">
      <span className="label">
        {formField.text}
        {formField.required && (country === 'US' || country === 'CA')
          ? ' *'
          : ''}
      </span>
      <span className="field select">
        <RegionDropdown
          countryValueType={'short'}
          valueType={'short'}
          country={country}
          value={state}
          name={formField.name}
          disabled={!(country === 'US' || country === 'CA')}
          onChange={selectState}
          classes={classNames({
            'error-border': !!error,
          })}
        />
      </span>
      {error ? <span className="attention">{error}</span> : <></>}
    </label>
  )
}

export default StatePicker
