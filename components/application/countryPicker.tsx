import React, { useCallback, useEffect, useState } from 'react';
import { FormField } from '@/generated/graphql';
import { CountryDropdown } from 'react-country-region-selector';

interface CountryPickerProps {
  formField: FormField;
  selectedCountry: (name: string, country: string) => void;
}

const CountryPicker: React.FC<CountryPickerProps> = ({ formField, selectedCountry }) => {
  const [country, setCountry] = useState<string>(formField.value ? formField.value : 'US');

  const selectCountry = useCallback(
    (country: string) => {
      selectedCountry(formField.name, country);
      setCountry(country);
    },
    [formField.name, selectedCountry]
  );

  useEffect(() => {
    console.log('=========', formField.value);
    if (!formField.value) {
      selectedCountry(formField.name, 'US');
    }
  }, [formField.name, formField.value, selectedCountry]);

  return (
    <label className="half-size">
      <span className="label">
        {formField.text}
        {formField.required ? '*' : ''}
      </span>
      <span className="field select">
        <CountryDropdown valueType={'short'} value={country} onChange={selectCountry} />
      </span>
    </label>
  );
};

export default CountryPicker;
