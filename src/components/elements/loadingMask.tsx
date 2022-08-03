import React from 'react'

const styles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1000,
}

const LoadingMask: React.FC = () => <div style={styles} />

export default LoadingMask
