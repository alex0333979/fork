import React, { useCallback, useEffect, useState } from 'react';
import { FormField } from '@/generated/graphql';

interface SelectBoxProps {
  step: number;
  formField: FormField;
  onValueChange: (name: string, value: string | number) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ formField, onValueChange, step }) => {
  const [value, setValue] = useState<string | number>('default');

  useEffect(() => {
    setValue(formField.value ?? formField.defaultValue ?? 'default');
  }, [formField.defaultValue, formField.value]);

  const onChange = useCallback(
    (name: string, value: string | number) => {
      onValueChange(name, value);
      setValue(value);
    },
    [onValueChange]
  );

  return (
    <label className="half-size">
      <span className="label">
        {formField.text}
        {formField.required ? ' *' : ''}
      </span>
      <span className="more">
        <span className="field select">
          <select
            name={`${formField.name}_${step}`}
            value={value}
            onChange={(e) => onChange(e.target.name, e.target.value)}>
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
    </label>
  );
};

export default SelectBox;
