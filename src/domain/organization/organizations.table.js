export const getOrganizationColumns = (props) => {
  const { t, k } = props;

  return [
    {
      key: 'name',
      label: t(k.organizations.name),
      render: (row) => row.name || '—',
      width: '25%',
    },
    {
      key: 'code',
      label: t(k.organizations.code),
      render: (row) => row.code || '—',
      width: '25%',
    },
    {
      key: 'counterparty',
      label: t(k.common.counterparty),
      render: (row) => row?.counterparty?.name || '-',
    }
  ]
}