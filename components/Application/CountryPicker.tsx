import React, { useState } from 'react';
import { FormField } from '@/generated/graphql';
import { CountryDropdown } from 'react-country-region-selector';

type CountryPickerProps = {
  formField: FormField;
  selectedCountry: (name: string, country: string) => void;
}

const CountryPicker: React.FC<CountryPickerProps> = ({ formField, selectedCountry }) => {
  const [country, setCountry] = useState<string>(formField.defaultValue ? formField.defaultValue : 'US');
  const selectCountry = (country: string) => {
    selectedCountry(formField.name, country);
    setCountry(country);
  };
  return (
    <label className="half-size">
      <span className="label">{formField.text}{formField.required ? '*' : ''}</span>
      <span className="field select">
        <CountryDropdown
          valueType={'short'}
          value={country}
          onChange={selectCountry}/>
      </span>
    </label>
  );
};

export default CountryPicker;