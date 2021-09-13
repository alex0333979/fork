import React from 'react';
import { FormField } from '@/generated/graphql';

type TextInputProps = {
  formField: FormField
}

const TextInput: React.FC<TextInputProps> = ({ formField }) => {
  return (
    <label className="half-size">
      <span className="label">{formField.text}{formField.required? '*': ''}
        {
          formField.notes? (<i className="icon-about"/>) : (<></>)
        }
      </span>
      <span className="field">
        <input
          type="text"
          name={formField.name}
          value={formField.value? formField.value : (formField.defaultValue? formField.defaultValue : '')}
          placeholder={formField.placeholder ? formField.placeholder : ''}
          disabled={!!(formField.disabled)}
        />
      </span>
      {
        formField.name === 'social_security_number'? (
          <span className="attention">{formField.notes}</span>
        ) : (<></>)
      }
    </label>
  )
}

export default TextInput;