import React, { useCallback, useState } from 'react';
import { FormField } from '@/generated/graphql';
import Input from 'react-phone-number-input/input';

interface PhoneInputProps {
  formField: FormField;
  onValueChange: (name: string, value: string | undefined) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ formField, onValueChange }) => {
  const [value, setValue] = useState<string | undefined>(formField.value ? formField.value : '');

  const onChange = useCallback(
    (name: string, value: string | undefined) => {
      onValueChange(name, value || '');
      setValue(value);
    },
    [onValueChange]
  );

  return (
    <label className="half-size">
      <span className="label">
        {formField.text}
        {formField.required ? '*' : ''}
        {formField.notes ? <i className="icon-about" /> : <></>}
      </span>
      <span className="field">
        <Input
          country="US"
          international
          withCountryCallingCode
          value={value?.toString()}
          onChange={(value) => onChange(formField.name, value)}
        />
      </span>
      {/* <span className="attention">{formField.notes}</span>*/}
    </label>
  );
};

export default PhoneInput;
