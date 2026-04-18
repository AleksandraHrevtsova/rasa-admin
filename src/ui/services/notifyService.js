import { toast } from 'sonner';

export const notify = () => {

  const setOptions = (type, options) => {
    let textColors = {
      primary: '#2F3A1F',
      success: '#6c9a00',
      error: '#c62828',
      warning: '#e6a800'
    };
    return {
      className: 'toast',
      style: { color: textColors[type] || textColors.primary },
      ...options
    }
  }

  return {
    success: (msg, options) => toast.success(msg, setOptions('success', options)),
    error: (msg, options) => toast.error(msg, setOptions('error', options)),
    warning: (msg, options) => toast.warning(msg, setOptions('warning', options)),
    info: (msg, options) => toast(msg, setOptions('', options)),
  }
}