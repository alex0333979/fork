import React from 'react'
import classNames from 'classnames'

interface Props<T> {
  className?: string
  name: string
  selected: boolean
  label: React.ReactNode
  value: T
  onSelect: (v: T) => void
}

const RadioElement = <T,>({
  className,
  selected,
  label,
  name,
  value,
  onSelect,
}: Props<T>) => (
  <label
    className={classNames('full-size', { [className || '']: !!className })}>
    <span className="field radio">
      {typeof label === 'string' ? (
        <span className="name">{label}</span>
      ) : (
        label
      )}
      <input
        type="radio"
        name={name}
        checked={selected}
        placeholder=""
        onChange={() => onSelect(value)}
      />
      <span className="wrap">
        <span className="bullet" />
        <span className="border" />
      </span>
    </span>
  </label>
)

export default RadioElement
