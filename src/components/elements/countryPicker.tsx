import React, { useCallback, useEffect, useState } from 'react'
import { FormField } from '@/apollo'
import { CountryDropdown } from 'react-country-region-selector'
import classNames from 'classnames'

interface CountryPickerProps {
  formField: FormField
  selectedCountry: (name: string, country: string) => void
  error: string | undefined
}

const CountryPicker: React.FC<CountryPickerProps> = ({
  formField,
  selectedCountry,
  error,
}) => {
  const [country, setCountry] = useState<string>(
    formField.value ? formField.value : '',
  )

  const selectCountry = useCallback(
    (country: string) => {
      selectedCountry(formField.name, country)
      setCountry(country)
    },
    [formField.name, selectedCountry],
  )

  useEffect(() => {
    if (!formField.value && formField.required) {
      selectedCountry(formField.name, 'US')
    }
  }, [formField.name, formField.required, formField.value, selectedCountry])

  return (
    <label className="half-size">
      <span className="label">
        {formField.text}
        {formField.required ? ' *' : ''}
      </span>
      <span className="field select">
        <CountryDropdown
          name={formField.name}
          valueType={'short'}
          value={country}
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
