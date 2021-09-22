import React, { useCallback, useEffect, useState } from 'react';
import { FormField } from '@/generated/graphql';
import { CountryDropdown } from 'react-country-region-selector';
import classNames from 'classnames';

interface CountryPickerProps {
  step: number;
  formField: FormField;
  selectedCountry: (name: string, country: string) => void;
  error: string | undefined;
}

const CountryPicker: React.FC<CountryPickerProps> = ({
  formField,
  selectedCountry,
  step,
  error
}) => {
  const [country, setCountry] = useState<string>(formField.value ? formField.value : 'US');

  const selectCountry = useCallback(
    (country: string) => {
      selectedCountry(formField.name, country);
      setCountry(country);
    },
    [formField.name, selectedCountry]
  );

  useEffect(() => {
    if (!formField.value) {
      selectedCountry(formField.name, 'US');
    }
  }, [formField.name, formField.value, selectedCountry]);

  return (
    <label className="half-size">
      <span className="label">
        {formField.text}
        {formField.required ? ' *' : ''}
      </span>
      <span className="field select">
        <CountryDropdown
          name={`${formField.name}_${step}`}
          valueType={'short'}
          value={country}
          onChange={selectCountry}
          classes={classNames({
            'error-border': !!error
          })}
        />
      </span>
      {error ? <span className="attention">{error}</span> : <></>}
    </label>
  );
};

export default CountryPicker;
