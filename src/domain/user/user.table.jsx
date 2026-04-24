import { ShieldCheck, ShieldClose } from 'lucide-react';

export const getUserColumns = ({
  t,
  k,
  appUser,
  onToggleUser,
}) => [
  {
    key: 'role',
    label: t(k.common.role),
    render: (row) => row.role?.name || '—',
    width: '25%',
  },
  {
    key: 'name',
    label: t(k.common.name),
    sortable: true,
    width: '25%',
  },
  {
    key: 'counterparty',
    label: t(k.common.counterparty),
    render: (row) => row.counterparty?.name || '—',
    width: '25%',
  },
  {
    key: 'userHubs',
    label: t(k.common.hubs),
    render: (row) => row.userHubs?.length || '-',
    width: '25%',
  },
  {
    key: 'actions',
    label: t(k.common.actions),
    render: (row) => {
      const isCurrentUser = row.id === appUser.id;
      if (isCurrentUser) return '-';

      return (
        <button
          onClick={onToggleUser(row)}
          className="text-xs px-2 py-1 rounded border hover:bg-gray-100"
        >
          {row.isActive ? (
            <ShieldClose size={20} />
          ) : (
            <ShieldCheck size={20} />
          )}
        </button>
      );
    },
  },
];