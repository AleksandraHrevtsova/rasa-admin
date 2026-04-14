import { Plus } from 'lucide-react';

export const FAB = ({ onClick, icon: Icon = Plus, label }) => {
  return (
    <button
      onClick={onClick}
      className='
        fixed 
        top-16 right-8 
        md:hidden
        w-14 h-14 
        rounded-full 
        bg-blue-950 text-white 
        shadow-lg 
        flex items-center justify-center
        hover:bg-blue-800 
        active:scale-95 
        transition
        z-50
      '
      aria-label={label}
    >
      <Icon size={24} />
    </button>
  );
};