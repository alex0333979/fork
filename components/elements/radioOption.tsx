import React, { useCallback, useEffect, useState } from 'react';
import { FormField } from '@/generated/graphql';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';

interface RadioOptionProps {
  formField: FormField;
  onValueChange: (name: string, value: string | boolean) => void;
  error: string | undefined;
}

const RadioOption: React.FC<RadioOptionProps> = ({ formField, onValueChange, error }) => {
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
      {formField.options?.map((option, index) => (
        <label
          key={index}
          className={classNames({
            'third-size': formField.options && formField.options.length > 2,
            'half-size': !(formField.options && formField.options.length > 2)
          })}>
          <span className="field radio">
            <span className="name">
              {option.text}
              {option.notes ? (
                <a data-tip={option.notes}>
                  <i className="icon-about" />
                </a>
              ) : (
                <></>
              )}
            </span>
            <input
              type="radio"
              name={formField.name}
              placeholder={formField.placeholder ? formField.placeholder : ''}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="wrap">
              <span className="bullet" />
              <span className="border" />
            </span>
          </span>
          {error && index === 0 ? <span className="attention">{error}</span> : <></>}
        </label>
      ))}
      <ReactTooltip place="top" type="info" effect="float" />
    </div>
  );
};

export default RadioOption;
