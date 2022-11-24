import React, { useCallback, useEffect } from 'react'

type OnClose = () => void

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  onClose: OnClose,
) => {
  const clickListener = useCallback(
    (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose()
      }
    },
    [onClose, ref],
  )

  const escapeListener = useCallback(
    (e: any) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('click', clickListener)
    document.addEventListener('keyup', escapeListener)
    return () => {
      document.removeEventListener('click', clickListener)
      document.removeEventListener('keyup', escapeListener)
    }
  }, [escapeListener, clickListener])
}
