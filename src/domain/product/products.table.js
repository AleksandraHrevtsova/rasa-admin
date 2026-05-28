export const getProductColumns = (props) => {
  const { t, k } = props;

  return [
    {
      key: 'name',
      label: t(k.common.nameBase),
      render: (row) => row.name || '—',
      sortable: true,
      width: '40%',
    },
    {
      key: 'namePublic',
      label: t(k.common.namePublic),
      render: (row) => row.namePublic || '—',
      sortable: true,
      width: '15%',
    },
    {
      key: 'sku',
      label: t(k.product.sku),
      render: (row) => row.sku || '-',
      sortable: false,
      width: '10%',
    },
    {
      key: 'netto',
      label: t(k.product.netto),
      render: (row) =>  row.netto || row.weight.netto || '—',
      sortable: false,
      width: '15%',
    },
    {
      key: 'brutto',
      label: t(k.product.brutto),
      render: (row) =>  row.brutto || row.weight.brutto || '—',
      sortable: false,
      width: '15%',
    },
    {
      key: 'actions',
      label: t(k.common.actions),
      actions: [
        {
          type: 'toggle',
          confirm: (row) => {
            const titleKey = row.isActive ? k.product.confirmDeactivateTitle : k.product.confirmActivateTitle;
            const descriptionKey = row.isActive ? k.product.confirmDeactivateDesc : k.product.confirmActivateDesc;
            return {
              title: t(titleKey),
              description: t(descriptionKey, { name: row.name }),
            }
          },
        },
      ],
      width: '5%',
    },
  ];
};