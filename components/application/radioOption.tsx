import React, { useCallback, useEffect, useState } from 'react';
import { FormField } from '@/generated/graphql';
import classNames from 'classnames';

interface RadioOptionProps {
  step: number;
  formField: FormField;
  onValueChange: (name: string, value: string | boolean) => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({ formField, onValueChange, step }) => {
  const [value, setValue] = useState<string | boolean>('');

  useEffect(() => {
    setValue(formField.value ?? '');
  }, [formField.value]);

  const onChange = useCallback(
    (value: string | boolean) => {
      onValueChange(formField.name, value);
      setValue(value);
    },
    [formField.name, onValueChange]
  );

  return (
    <div className="group">
      <div className="group-label">
        <p>{formField.text}</p>
      </div>
      {formField.options?.map((option, i) => (
        <label
          key={i}
          className={classNames({
            'third-size': formField.options && formField.options.length > 2,
            'half-size': !(formField.options && formField.options.length > 2)
          })}>
          <span className="field radio">
            <span className="name">
              {option.text}
              {option.notes ? <i className="icon-about" /> : <></>}
            </span>
            <input
              type="radio"
              name={`${formField.name}_${step}`}
              placeholder={formField.placeholder ? formField.placeholder : ''}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="wrap">
              <span className="bullet" />
              <span className="border" />
            </span>
          </span>
          <span className="warning">Warning message</span>
        </label>
      ))}
    </div>
  );
};

export default RadioOption;
