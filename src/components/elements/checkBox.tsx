import React from 'react'

interface CheckBoxProps {
  text: string
  placeholder?: string
  value?: boolean
  onChange: (status: boolean) => void
}

const CheckBox: React.FC<CheckBoxProps> = ({
  text,
  placeholder = '',
  value = false,
  onChange,
}) => (
  <label className="full-size">
    <span className="field checkbox">
      <span className="name">{text}</span>
      <input
        type="checkbox"
        placeholder={placeholder}
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="wrap">
        <span className="bullet" />
        <span className="border" />
      </span>
    </span>
    <span className="warning">{'Warning message'}</span>
  </label>
)

export default CheckBox
