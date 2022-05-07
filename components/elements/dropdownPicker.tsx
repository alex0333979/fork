import React from 'react'
import classNames from 'classnames'
import Select from 'react-select'

export interface IDropdownOption {
  [x: string]: any
  label: string
  value: string
}

interface Props {
  className?: string
  label?: string
  options: IDropdownOption[]
  optionContainer: React.FC<any>
  valueContainer: React.FC<any>
  value: any
  onChange: (v: IDropdownOption & { [x: string]: any }) => void
}

const DropdownPicker: React.FC<Props> = ({
  className,
  label,
  options,
  value,
  optionContainer,
  valueContainer,
  onChange,
}) => (
  <div className={classNames('drop-down-picker-container', className)}>
    {!!label && <label className="picker-title">{label}</label>}
    <Select
      styles={{
        valueContainer: (base: any) => {
          const height = '55px'
          return { ...base, height }
        },
        menuPortal: (provided: any) => ({
          ...provided,
          zIndex: 9999,
        }),
      }}
      options={options}
      value={value}
      onChange={onChange}
      menuPortalTarget={document.body}
      components={{
        Option: optionContainer,
        ValueContainer: valueContainer,
      }}
    />
  </div>
)

export default DropdownPicker
