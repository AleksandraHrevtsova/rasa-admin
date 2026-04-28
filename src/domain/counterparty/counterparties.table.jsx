import { ToggleActiveAction } from '@/ui/components/table/actions/ToggleActiveAction';

export const getCounterpartyColumns = (props) => {
  const { t, k, appUser, onClick } = props;

  return [
    {
      key: 'name',
      label: t(k.common.title),
      render: (row) => row.role?.name || '—',
      width: '25%',
    },
    {
      key: 'hubs',
      label: t(k.common.hubs),
      render: (row) => row.hubs?.length || '-',
      width: '25%',
    },
    {
      key: 'products',
      label: t(k.common.products),
      render: (row) => row.netto || '—',
      width: '25%',
    },
    {
      key: 'actions',
      label: t(k.common.actions),
      render: (row) => (<ToggleActiveAction row={row} isHidden={false} onToggle={onClick} />),
    },
  ];
};