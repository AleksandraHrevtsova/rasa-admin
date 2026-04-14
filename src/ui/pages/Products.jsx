import { useLocation, useNavigate } from 'react-router';
import { Plus, ShieldCheck, ShieldClose } from 'lucide-react';

import { useLocale } from '../../contexts/LocaleContext';

import { useEntityTable } from '../hooks/useEntityTable';

import { NAV } from '../../config/constants';
import { getProducts} from '../../domain/product/product.service';
import { navigateToEntity } from '../../core/utils/navigation';

import { EntityPageLayout } from '../components/EntityPageLayout';
import { Button } from '../components/Button';
import DataTable from '../components/DataTable';

export default function Products() {
  const { t } = useLocale();

  const location = useLocation();
  const navigate = useNavigate();

  const {
    data,
    loading,
    isActive,
    setIsActive,
    pagination,
    setPagination,
  } = useEntityTable(getProducts);

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

  function formatLabel(key) {
    return t[`products.${key}`] || key;
  };

  const columns = [
    { key: 'namePublic', label: formatLabel('name'), sortable: true },
    { key: 'sku', label: formatLabel('sku'), render: (row) => row.sku || '-' },
    { key: 'netto', label: formatLabel('netto'), render: (row) => row.netto || '—' },
    { key: 'brutto', label: formatLabel('brutto'), render: (row) => row.brutto || '—' },
    // { key: 'email', label: formatLabel('email') },
  ];

  return (
    <EntityPageLayout
      title={formatLabel('title')}
      actions={{
        left: (
          <Button
            label={isActive ? t['table.showInactive'] : t['table.showActive']}
            onClick={() => setIsActive((p) => !p)} 
            action='show' 
            icon={isActive ? ShieldCheck : ShieldClose}
            hideLabelOnMobile
          />
        ),
        right: (
          <Button
            label={t['create']} 
            onClick={() => goToProduct()} 
            action='create' 
            icon={Plus}
          />
        )
      }}
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
      fab={{
        label: t['create'],
        onClick: () => goToProduct()
      }}
    />
  );
}