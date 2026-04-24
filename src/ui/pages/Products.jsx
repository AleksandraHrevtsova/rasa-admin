import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { NAV } from '@/config/constants';

import { navigateToEntity } from '@/core/utils/navigation';

import { getProducts} from '@/domain/product/product.service';

import DataTable from '@/ui/components/DataTable';
import { EntityPageLayout } from '@/ui/components/EntityPageLayout';

import { useI18n } from '@/ui/hooks/useI18n';
import { useEntityTable } from '@/ui/hooks/useEntityTable';

import { pageTags } from '@/config/constants';

export default function Products() {
  const { t, k } = useI18n();

  const location = useLocation();
  const navigate = useNavigate();

  const entityKey = pageTags.products;

  const {
    data,
    loading,
    isActive,
    setIsActive,
    pagination,
    setPagination,
  } = useEntityTable(entityKey, getProducts);

  const goToProduct = (id) => {
    navigateToEntity({
      navigate,
      location,
      listPath: NAV.products,
      createPath: NAV.newProduct,
      editPath: NAV.editProduct,
      id,
    });
  };

  const columns = [
    { key: 'name', label: t(k.common.title), sortable: true },
    { key: 'sku', label: t(k.product.sku), render: (row) => row.sku || '-' },
    { key: 'netto', label: t(k.product.netto), render: (row) => row.netto || '—' },
    { key: 'brutto', label: t(k.product.brutto), render: (row) => row.brutto || '—' },
    // { key: 'email', label: t(k.common.email) },
  ];

  const actions = useMemo(() => {
    return {
      left: {
        isActive,
        onClick: () => setIsActive((p) => !p),
      },
      right: {
        onClick: () => goToProduct(),
      }
    };
  }, [isActive, navigate, location]);

  return (
    <EntityPageLayout
      title={t(k.products.title)}
      actions={actions}
      loading={loading}
      table={
        <DataTable
          data={data}
          columns={columns}
          loading={loading}
          pagination={pagination}
          setPagination={setPagination}
          onRowClick={(row) => goToProduct(row.id)}
        />
      }
      fab={{ onClick: () => goToProduct() }}
    />
  );
}