import React, { useCallback, useState } from 'react';
import { FormField } from '@/generated/graphql';
import Input from 'react-phone-number-input/input';
import { isPossiblePhoneNumber } from 'react-phone-number-input';

interface PhoneInputProps {
  step: number;
  formField: FormField;
  onValueChange: (name: string, value: string | undefined) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ formField, onValueChange, step }) => {
  const [value, setValue] = useState<string>(formField.value ? formField.value.toString() : '');

  console.log('======', formField.value, isPossiblePhoneNumber(value));
  const onChange = useCallback(
    (name: string, value: string) => {
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
        {formField.notes ? <i className="icon-about" /> : <></>}
      </span>
      <span className="field">
        <Input
          country="US"
          international
          withCountryCallingCode
          value={value}
          name={`${formField.name}_${step}`}
          onChange={(value) => onChange(formField.name, value ?? '')}
        />
      </span>
      {/* <span className="attention">{formField.notes}</span>*/}
    </label>
  );
};

export default PhoneInput;
