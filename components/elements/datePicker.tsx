import React, { useCallback, useState } from 'react';
import { FormField } from '@/generated/graphql';
import classNames from 'classnames';
import DateFnsUtils from '@date-io/date-fns';

import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            name={formField.name}
            className={classNames({
              'error-border': !!error
            })}
            format={'MM/dd/yyyy'}
            value={date}
            onChange={(date: Date | null) => onChange(date)}
            maxDate={new Date()}
          />
        </MuiPickersUtilsProvider>
      </span>
      {error ? <span className="attention">{error}</span> : <></>}
    </label>
  );
};

export default AppDatePicker;
