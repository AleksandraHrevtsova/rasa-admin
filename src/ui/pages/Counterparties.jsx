import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Plus, ShieldCheck, ShieldClose } from 'lucide-react';

import { useLocale } from '../../contexts/LocaleContext';

import { useEntityTable } from '../hooks/useEntityTable';

import { getCounterparties } from '../../domain/counterparty/counterparty.service';

import { EntityPageLayout } from '../components/EntityPageLayout';
import { Button } from '../components/Button';
import DataTable from '../components/DataTable';

import { NAV } from '../../config/constants';
import { navigateToEntity } from '../../core/utils/navigation';

export default function Counterparties() {
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
  } = useEntityTable(getCounterparties);

  // useEffect(() => {
  //   console.log('data:', data);
  // }, [data]);

  const goToCounterparty = (id) => {
    navigateToEntity({
      navigate,
      location,
      listPath: NAV.counterparties,
      createPath: NAV.newCounterparty,
      editPath: NAV.editCounterparty,
      id,
    });
  };

  function formatLabel(key) {
    return t[`counterparties.${key}`] || key;
  };

  const columns = [
    { key: 'namePublic', label: formatLabel('name'), sortable: true },
    { key: 'hubs', label: t['hubs'], render: (row) => row.hubs?.length || '-' },
    { key: 'products', label: t['products'], render: (row) => row.role?.name || '—' },
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
            onClick={() => goToCounterparty()} 
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
          onRowClick={(row) => goToCounterparty(row.id)}
        />
      }
      fab={{
        label: t['create'],
        onClick: () => goToCounterparty()
      }}

    />
  );
}