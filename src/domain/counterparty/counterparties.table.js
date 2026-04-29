export const getCounterpartyColumns = (props) => {
  const { t, k } = props;

  return [
    {
      key: 'name',
      label: t(k.common.title),
      render: (row) => row.name || '—',
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
      actions: [
        {
          type: 'toggle',
          confirm: (row) => {
            const titleKey = row.isActive ? k.counterparty.confirmDeactivateTitle : k.counterparty.confirmActivateTitle;
            const descriptionKey = row.isActive ? k.counterparty.confirmDeactivateDesc : k.counterparty.confirmActivateDesc;
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