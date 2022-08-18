import React, { useCallback, useEffect, useState } from 'react'
import { CountryDropdown } from 'react-country-region-selector'
import classNames from 'classnames'

import { FormField } from '@/apollo'

interface CountryPickerProps {
  className?: string | undefined
  formField: FormField
  selectedCountry: (name: string, country: string) => void
  error: string | undefined
}

const CountryPicker: React.FC<CountryPickerProps> = ({
  className = 'half-size',
  formField,
  selectedCountry,
  error,
}) => {
  const [country, setCountry] = useState<string | undefined>()

  const selectCountry = useCallback(
    (country: string) => {
      selectedCountry(formField.name, country)
      setCountry(country)
    },
    [formField.name, selectedCountry],
  )

  useEffect(() => {
    if (country === undefined) {
      const _country = formField.required
        ? formField.value || 'US'
        : formField.value || ''
      setCountry(_country)
      selectedCountry(formField.name, _country)
    }
  }, [
    country,
    formField.name,
    formField.required,
    formField.value,
    selectedCountry,
  ])

  return (
    <label className={className}>
      <span className="label">
        {formField.text}
        {formField.required ? ' *' : ''}
      </span>
      <span className="field select">
        <CountryDropdown
          name={formField.name}
          valueType={'short'}
          value={country || ''}
          onChange={selectCountry}
          classes={classNames({
            'error-border': !!error,
          })}
        />
      </span>
      {error ? <span className="attention">{error}</span> : <></>}
    </label>
  )
}

export default CountryPicker
