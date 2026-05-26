export const getProductColumns = (props) => {
  const { t, k } = props;

  return [
    {
      key: 'name',
      label: t(k.common.nameBase),
      render: (row) => row.name || '—',
      width: '40%',
    },
    {
      key: 'namePublic',
      label: t(k.common.namePublic),
      render: (row) => row.namePublic || '—',
      width: '25%',
    },
    {
      key: 'sku',
      label: t(k.product.sku),
      render: (row) => row.sku || '-',
      width: '10%',
    },
    {
      key: 'netto',
      label: t(k.product.netto),
      render: (row) =>  row.netto || row.weight.netto || '—',
      width: '10%',
    },
    {
      key: 'brutto',
      label: t(k.product.brutto),
      render: (row) =>  row.brutto || row.weight.brutto || '—',
      width: '10%',
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