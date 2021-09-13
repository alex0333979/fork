import React from 'react';
import { FormField } from '@/generated/graphql';

type SelectBoxProps = {
  formField: FormField
}

const SelectBox: React.FC<SelectBoxProps> = ({ formField }) => {
  return (
    <label className="half-size">
      <span className="label">{formField.text}{formField.required? '*': ''}</span>
        <span className="more">
          <span className="field select">
          <select name={formField.name} placeholder={formField.placeholder ? formField.placeholder : ''}>
            {
              formField.options?.map((option, index) => {
                return (
                  <option key={index} value={option.value}>{option.text}</option>
                )
              })
            }
          </select>
        </span>
      </span>
    </label>
  )
}

export default SelectBox;