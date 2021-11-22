import React, { useCallback, useEffect, useState } from 'react';
import { FormField, ValidationType } from '@/generated/graphql';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false
});

interface TextInputProps {
  formField: FormField;
  onValueChange: (name: string, value: string | number) => void;
  error: string | undefined;
}

const TextInput: React.FC<TextInputProps> = ({ formField, onValueChange, error }) => {
  const [value, setValue] = useState<string | number>('');
  const [shouldNumber, setShouldNumber] = useState<boolean>(false);
  const [minLength, setMinLength] = useState<number>(0);
  const [maxLength, setMaxLength] = useState<number>(30);

  useEffect(() => {
    setValue(formField.value ?? '');
  }, [formField.value]);

  useEffect(() => {
    const a = formField.validations?.find((v) => v.type === ValidationType.IsNumber);
    const b = formField.validations?.find((v) => v.type === ValidationType.MinLength);
    const c = formField.validations?.find((v) => v.type === ValidationType.MaxLength);
    if (a) {
      setShouldNumber(true);
    } else {
      setShouldNumber(false);
    }

    if (b) {
      setMinLength(b.value ?? 0);
    }

    if (c) {
      setMaxLength(c.value ?? 30);
    }
  }, [formField.validations]);

  const isNumberInput = useCallback((value): boolean => {
    const re = /^[0-9\b]+$/;
    return value === '' || re.test(value);
  }, []);

  const onChange = useCallback(
    (value: string | number) => {
      if (value.toString().length > maxLength) {
        return;
      }
      if (shouldNumber) {
        if (isNumberInput(value)) {
          onValueChange(formField.name, Number(value) || '');
          setValue(value);
        }
      } else {
        onValueChange(formField.name, value || '');
        setValue(value);
      }
    },
    [formField.name, isNumberInput, maxLength, onValueChange, shouldNumber]
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
        <input
          type="text"
          className={classNames({
            'error-border': !!error
          })}
          name={formField.name}
          value={value}
          placeholder={formField.placeholder ? formField.placeholder : ''}
          disabled={!!formField.disabled}
          minLength={minLength}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
        />
      </span>
      {formField.name === 'social_security_number' ? (
        <span className="attention">{formField.notes}</span>
      ) : (
        <></>
      )}
      {error ? <span className="attention">{error}</span> : <></>}
      <ReactTooltip place="top" type="info" effect="float" />
    </label>
  );
};

export default TextInput;
