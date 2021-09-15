import React, { useState } from 'react';
import { FormField, ValidationType } from '@/generated/graphql';
import Input from 'react-phone-number-input/input';

interface TextInputProps {
  formField: FormField;
  onValueChange: (name: string, value: string | undefined) => void;
}

const TextInput: React.FC<TextInputProps> = ({ formField, onValueChange }) => {
  const [value, setValue] = useState<string | undefined>(formField.value ? formField.value : '');

  const onChange = (name: string, value: string | undefined) => {
    onValueChange(name, value || '');
    setValue(value);
  };

  return (
    <label className="half-size">
      <span className="label">
        {formField.text}
        {formField.required ? '*' : ''}
        {formField.notes ? <i className="icon-about" /> : <></>}
      </span>
      <span className="field">
        {formField.validations?.find((validation) => validation.type === ValidationType.IsPhone) ? (
          <Input
            country="US"
            international
            withCountryCallingCode
            value={value?.toString()}
            onChange={(value) => onChange(formField.name, value)}
          />
        ) : (
          <input
            type="text"
            name={formField.name}
            value={value}
            placeholder={formField.placeholder ? formField.placeholder : ''}
            disabled={!!formField.disabled}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        )}
      </span>
      {formField.name === 'social_security_number' ? (
        <span className="attention">{formField.notes}</span>
      ) : (
        <></>
      )}
    </label>
  );
};

export default TextInput;
