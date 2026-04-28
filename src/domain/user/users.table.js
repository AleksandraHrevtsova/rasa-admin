export const getUserColumns = (props) => {
  const { t, k } = props;

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
      actions: [
        {
          type: 'toggle',
          confirm: (row) => {
            const titleKey = row.isActive ? k.user.confirmDeactivateTitle : k.user.confirmActivateTitle;
            const descriptionKey = row.isActive ? k.user.confirmDeactivateDesc : k.user.confirmActivateDesc;
            return {
              title: t(titleKey),
              description: t(descriptionKey, { name: row.name }),
            }
          },
        },
      ],
    },
  ];
};