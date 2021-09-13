import React from 'react';
import { FormField } from '@/generated/graphql';

type CountryPickerProps = {
  formField: FormField
}

const CountryPicker: React.FC<CountryPickerProps> = ({ formField }) => {
  return (
    <label className="half-size">
      <span className="label">Country Of Birth *</span>
      <span className="field select">
        <select>
          <option>Selcect country</option>
          <option>Selcect country</option>
          <option>Selcect country</option>
        </select>
      </span>
    </label>
  )
}

export default CountryPicker;