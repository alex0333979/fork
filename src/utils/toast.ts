import { toast } from 'react-toastify'

export const showSuccess = (message: string) => {
  if (!message) return

  toast.success(message)
}

export const showError = (message: string) => {
  if (!message) return

  toast.error(message)
}
