import React, { useCallback, useState } from 'react';
import { FormField } from '@/generated/graphql';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';

interface AppDatePickerProps {
  formField: FormField;
  onValueChange: (name: string, value: string | undefined) => void;
  error: string | undefined;
}

const AppDatePicker: React.FC<AppDatePickerProps> = ({ formField, onValueChange, error }) => {
  const [date, setDate] = useState<Date | null>(new Date(formField.value));
  const onChange = useCallback(
    (value: Date | null) => {
      onValueChange(formField.name, value?.toISOString().split('T')[0]);
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
        <DatePicker
          name={formField.name}
          className={classNames({
            'error-border': !!error
          })}
          showYearDropdown={true}
          dateFormat={'MM/dd/yyyy'}
          selected={date}
          onChange={(date: Date | null) => onChange(date)}
          maxDate={new Date()}
        />
      </span>
      {error ? <span className="attention">{error}</span> : <></>}
    </label>
  );
};

export default AppDatePicker;
