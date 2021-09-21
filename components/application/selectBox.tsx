import React, { useState } from 'react';
import { FormField } from '@/generated/graphql';

interface SelectBoxProps {
  formField: FormField;
  onValueChange: (name: string, value: string | number) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ formField, onValueChange }) => {
  const [value, setValue] = useState<string | number>('');

  const onChange = (name: string, value: string | number) => {
    onValueChange(name, value);
    setValue(value);
  };

  return (
    <label className="half-size">
      <span className="label">
        {formField.text}
        {formField.required ? '*' : ''}
      </span>
      <span className="more">
        <span className="field select">
          <select
            name={formField.name}
            value={value}
            onChange={(e) => onChange(e.target.name, e.target.value)}>
            <option value="default" disabled hidden>
              {formField.placeholder ? formField.placeholder : ''}
            </option>
            {formField.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </span>
      </span>
    </label>
  );
};

export default SelectBox;
