import clsx from 'clsx';

const baseStyles =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    submit:
      'bg-blue-950 text-white hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-950',
  
    create:
      'bg-blue-950 text-white hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-950',
  
    activate:
      'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600',
  
    deactivate:
      'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500',
  
    show:
      'bg-white text-blue-950 border hover:bg-blue-700 hover:text-white active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-blue-950',
  
    ghost:
      'bg-transparent hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
  };

const sizes = {
  sm: 'text-sm px-3 py-1.5 rounded',
  md: 'text-sm px-4 py-2 rounded',
  lg: 'text-base px-5 py-2.5 rounded-md',
  icon: 'w-10 h-10 rounded-full p-0',
};

export const Button = ({
  type = 'button',
  label,
  onClick = null,
  action = 'submit',
  size = 'md',
  icon: Icon,
  isLoading = false,
  disabled = false,
  fullWidth = false,
  hideLabelOnMobile = false,
  className,
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(
        baseStyles,
        variants[action],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {/* Loader */}
      {isLoading && (
        <span className='animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full' />
      )}

      {/* Icon */}
      {!isLoading && Icon && <Icon size={18} />}

      {/* Label */}
      {label && (
        <span className={clsx(hideLabelOnMobile && 'hidden md:inline')}>
          {label}
        </span>
      )}
    </button>
  );
};