import React, { useCallback, useMemo, useState } from 'react'
import { FormField } from '@/apollo'
import classNames from 'classnames'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'

import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

interface AppDatePickerProps {
  formField: FormField
  onValueChange: (name: string, value: string | undefined) => void
  error: string | undefined
}

const AppDatePicker: React.FC<AppDatePickerProps> = ({
  formField,
  onValueChange,
  error,
}) => {
  const [date, setDate] = useState<Date | null>(
    formField.value ? new Date(formField.value) : null,
  )
  const onChange = useCallback(
    (value: Date | null) => {
      onValueChange(
        formField.name,
        value !== null ? moment(value).format('MM/DD/YYYY') : undefined,
      )
      setDate(value)
    },
    [formField.name, onValueChange],
  )
  const maxDate = useMemo(
    () =>
      formField.name === 'date_of_return' ||
      formField.name === 'date_of_departure'
        ? null
        : new Date(),
    [formField.name],
  )
  return (
    <label className="half-size">
      <span className="label">
        {formField.text}
        {formField.required ? ' *' : ''}
      </span>
      <span className="field date-time-field">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            name={formField.name}
            className={classNames({
              'error-border': !!error,
            })}
            format={'MMddyyyy'}
            placeholder={'mmddyyyy'}
            value={date}
            onChange={(date: Date | null) => onChange(date)}
            maxDate={maxDate}
          />
        </MuiPickersUtilsProvider>
      </span>
      {error ? <span className="attention">{error}</span> : <></>}
    </label>
  )
}

export default AppDatePicker
