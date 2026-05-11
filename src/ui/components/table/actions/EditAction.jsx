import { Pencil } from 'lucide-react';

export function EditAction({ row, onEdit }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onEdit(row);
      }}
      className='text-xs px-2 py-1 rounded border hover:bg-gray-100'
    >
      <Pencil size={16} />
    </button>
  );
}