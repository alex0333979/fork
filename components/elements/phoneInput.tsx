import React, { useCallback, useState } from 'react';
import { FormField } from '@/generated/graphql';
import Input from 'react-phone-number-input/input';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false
});

interface PhoneInputProps {
  formField: FormField;
  onValueChange: (name: string, value: string | undefined) => void;
  error: string | undefined;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ formField, onValueChange, error }) => {
  const [value, setValue] = useState<string>(formField.value ? formField.value.toString() : '');

  const onChange = useCallback(
    (value: string) => {
      onValueChange(formField.name, value);
      setValue(value);
    },
    [formField.name, onValueChange]
  );

  return (
    <label className="half-size">
      <span className="label">
        {formField.text}
        {formField.required ? ' *' : ''}
        {formField.notes ? (
          <a data-tip={formField.notes}>
            <i className="icon-about" />
          </a>
        ) : (
          <></>
        )}
      </span>
      <span className="field">
        <Input
          country="US"
          international
          withCountryCallingCode
          value={value}
          name={formField.name}
          onChange={(value) => onChange(value ?? '')}
          className={classNames({
            'error-border': !!error
          })}
        />
      </span>
      {error ? <span className="attention">{error}</span> : <></>}
      <ReactTooltip place="top" type="info" effect="float" />
    </label>
  );
};

export default PhoneInput;
