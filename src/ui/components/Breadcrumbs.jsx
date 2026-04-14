import { useLocation } from 'react-router';

export function Breadcrumbs() {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);

  return (
    <div className='text-sm text-gray-500 mb-2 flex gap-2 flex-wrap'>
      <span>Home</span>
      {parts.map((p, i) => (
        <span key={i} className='flex gap-2'>
          <span>/</span>
          <span className='capitalize'>{p}</span>
        </span>
      ))}
    </div>
  );
}