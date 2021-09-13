import React from 'react';
import { FormField } from '@/generated/graphql';

type RadioOptionProps = {
  formField: FormField
}

const RadioOption: React.FC<RadioOptionProps> = ({ formField }) => {
  return (
    <div className="group">
      <div className="group-label">
        <p>{formField.text}</p>
      </div>
      {
        formField.options?.map((option, index) => {
          return (
            <label key={index} className="third-size">
              <span className="field radio">
                <span className="name">
                  {option.text}
                  {
                    option.notes? (<i className="icon-about"/>) : (<></>)
                  }
                </span>
                <input type="radio" name={formField.name} placeholder={formField.placeholder? formField.placeholder : ''}/>
                <span className="wrap">
                  <span className="bullet"/>
                  <span className="border"/>
                </span>
              </span>
              <span className="warning">Warning message</span>
            </label>
          );
        })
      }
    </div>
  )
}

export default RadioOption;