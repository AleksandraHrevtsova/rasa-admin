export function EntityFormLayout({ title, children, actions, isDisabled, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className='p-4 max-w-xl'>
      <h1 className='text-xl font-semibold mb-4'>{title}</h1>

      <div className={isDisabled ? 'opacity-50' : ''}>
        {children}
      </div>

      <div className='flex flex-wrap gap-2 mt-4 items-start'>
        {actions}
      </div>
    </form>
  );
}