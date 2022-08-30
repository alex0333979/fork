import { toast, ToastOptions } from 'react-toastify'

const opts: ToastOptions = {
  position: 'top-center',
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  autoClose: 3000,
}

export const showSuccess = (message: string) => {
  if (!message) return

  toast.success(message, opts)
}

export const showError = (message: string) => {
  if (!message) return

  toast.error(message, opts)
}

export const showWarning = (message: string) => {
  if (!message) return

  toast.warning(message, opts)
}
