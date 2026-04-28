export const getProductColumns = (props) => {
  const { t, k } = props;

  return [
    {
      key: 'name',
      label: t(k.common.title),
      render: (row) => row.role?.name || '—',
      width: '25%',
    },
    {
      key: 'sku',
      label: t(k.product.sku),
      render: (row) => row.sku || '-',
      width: '25%',
    },
    {
      key: 'netto',
      label: t(k.product.netto),
      render: (row) => row.netto || '—',
      width: '25%',
    },
    {
      key: 'brutto',
      label: t(k.product.brutto),
      render: (row) => row.brutto || '-',
      width: '25%',
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
    },
  ];
};