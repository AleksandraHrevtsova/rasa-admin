import { ToggleActiveAction } from '@/ui/components/table/actions/ToggleActiveAction';

export const getUserColumns = (props) => {
  const { t, k, appUser, onClick } = props;

  return [
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
      render: (row) => (<ToggleActiveAction row={row} isHiden={row.id === appUser?.id} onToggle={onClick} />),
    },
  ];
};