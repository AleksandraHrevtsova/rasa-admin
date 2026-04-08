const defaultStyles = 'border px-4 py-2 rounded w-full transition-colors duration-200 focus:outline-none';
const defaultDisableStyles = 'text-white opacity-50 cursor-not-allowed pointer-events-none';
const actionStyles = {
  submit: {
    base: 'bg-blue-950 text-white',
    hover: 'hover:bg-blue-700',
    active: 'active:bg-blue-800',
    disabled: 'bg-blue-600 ' + defaultDisableStyles,
  },
  activate: {
    base: 'bg-green-600 text-white',
    hover: 'hover:bg-green-700',
    active: 'active:bg-green-800',
    disabled: 'bg-green-600 ' + defaultDisableStyles,
  },
  deactivate: {
    base: 'bg-red-500 text-white',
    hover: 'hover:bg-red-600',
    active: 'active:bg-red-700',
    disabled: 'bg-red-500 ' + defaultDisableStyles,
  },
  create: {
    base: 'bg-blue-950 text-white',
    hover: 'hover:bg-blue-700',
    active: 'active:bg-blue-800',
    disabled: 'bg-blue-600 ' + defaultDisableStyles,
  }
};

export const Button = ({ type = 'button', label, handleClick, action, isDisabled }) => {
  const styles = actionStyles[action] || '';
  const finalClass = isDisabled
    ? `${defaultStyles} ${styles.disabled}`
    : `${defaultStyles} ${styles.base} ${styles.hover} ${styles.active}`;

  return (
    <button
      type={type}
      onClick={handleClick}
      className={finalClass}
      disabled={isDisabled}
    >
      {label}
    </button>
  )
};