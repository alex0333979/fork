import React, { useCallback, useState } from 'react';
import { FormField } from '@/generated/graphql';

interface DatePickerProps {
  step: number;
  formField: FormField;
  onValueChange: (name: string, value: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ formField, onValueChange, step }) => {
  const [date, setDate] = useState<string>(formField.value ? formField.value : '1900-01-01');
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
        />
      </span>
      <span className="warning">Warning message</span>
    </label>
  );
};

export default DatePicker;
