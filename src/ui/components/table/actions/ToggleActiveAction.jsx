import { ShieldCheck, ShieldClose } from 'lucide-react';

export function ToggleActiveAction(props) {
  const { row, appUser, onToggle } = props;
  const isCurrentUser = row.id === appUser?.id;

  const handleClick = (e) => {
    e.stopPropagation();
    onToggle(row);
  };

  if (isCurrentUser) return '-';

  return (
    <button
      onClick={handleClick}
      className="text-xs px-2 py-1 rounded border hover:bg-gray-100"
    >
      {row.isActive ? (
        <ShieldClose size={20} />
      ) : (
        <ShieldCheck size={20} />
      )}
    </button>
  );
}