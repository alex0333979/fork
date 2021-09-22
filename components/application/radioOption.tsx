import React, { useCallback, useEffect, useState } from 'react';
import { FormField } from '@/generated/graphql';
import classNames from 'classnames';

interface RadioOptionProps {
  formField: FormField;
  onOptionSelected: (name: string, index: number) => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({ formField, onOptionSelected }) => {
  const [index, setIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    const index = formField.options?.findIndex((option) => option.value === formField.value);
    if (index !== -1) {
      setIndex(index);
    }
  }, [formField]);

  const onSelect = useCallback(
    (index: number) => {
      onOptionSelected(formField.name, index);
      setIndex(index);
    },
    [formField.name, onOptionSelected]
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
              name={formField.name}
              placeholder={formField.placeholder ? formField.placeholder : ''}
              checked={index === i}
              onChange={() => onSelect(i)}
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
