import React, { useCallback, useState } from 'react';
import { FormField } from '@/generated/graphql';
import classNames from 'classnames';

interface DatePickerProps {
  step: number;
  formField: FormField;
  onValueChange: (name: string, value: string) => void;
  error: string | undefined;
}

const DatePicker: React.FC<DatePickerProps> = ({ formField, onValueChange, step, error }) => {
  const [date, setDate] = useState<string>(formField.value ? formField.value : '1940-01-01');
  const onChange = useCallback(
    (value: string) => {
      onValueChange(formField.name, value);
      setDate(value);
    },
    [formField.name, onValueChange]
  );
  return (
    <label className="half-size">
      <span className="label">
        {formField.text}
        {formField.required ? ' *' : ''}
      </span>
      <span className="field">
        <input
          type="date"
          name={`${formField.name}_${step}`}
          value={date}
          placeholder={formField.placeholder ? formField.placeholder : ''}
          onChange={(e) => onChange(e.target.value)}
          className={classNames({
            'error-border': !!error
          })}
        />
      </span>
      {error ? <span className="attention">{error}</span> : <></>}
    </label>
  );
};

export default DatePicker;
