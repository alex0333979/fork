import React from 'react'
import classNames from 'classnames'
import { Bars, Oval, Puff, TailSpin, ThreeDots } from 'react-loading-icons'

interface Props {
  loading?: boolean
  size?: number
  color?: string
  variant?: 'bars' | 'oval' | 'puff' | 'spin' | 'dots'
  className?: string
}

const LoadingSpinner: React.FC<Props> = ({
  loading = true,
  size = 24,
  color = '#0080FF',
  variant = 'bars',
  className,
}) => {
  if (!loading) return null

  if (variant === 'bars') {
    return (
      <div className={classNames('image-loading-wrapper', className)}>
        <Bars height={size} fill={color} stroke="transparent" />
      </div>
    )
  }
  if (variant === 'oval') {
    return (
      <div className={classNames('image-loading-wrapper', className)}>
        <Oval height={size} fill="transparent" stroke={color} />
      </div>
    )
  }
  if (variant === 'puff') {
    return (
      <div className={classNames('image-loading-wrapper', className)}>
        <Puff height={size} fill="transparent" stroke={color} />
      </div>
    )
  }
  if (variant === 'spin') {
    return (
      <div className={classNames('image-loading-wrapper', className)}>
        <TailSpin height={size} fill={color} stroke={color} />
      </div>
    )
  }
  if (variant === 'dots') {
    return (
      <div className={classNames('image-loading-wrapper', className)}>
        <ThreeDots height={size} fill={color} stroke="transparent" />
      </div>
    )
  }

  return (
    <div className={classNames('image-loading-wrapper', className)}>
      <Bars height={size} fill={color} stroke="transparent" />
    </div>
  )
}

export default LoadingSpinner
