import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useAuth } from '@/core/auth/hooks/useAuth';
import { navigateToEntity } from '@/core/utils/navigation';

import { EntityPageLayout } from '@/ui/components/EntityPageLayout';
import DataTable from '@/ui/components/table/DataTable';

import { useI18n } from '@/ui/hooks/useI18n';
import { useEntityTable } from '@/ui/hooks/useEntityTable';

export function EntityPage({
  entityKey,
  title,
  getColumns,
  fetchFn,
  useSideData, // roles, categories etc
  renderSidebar,
  onToggle,
  getPaths,
}) {
  const { t, k } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const { appUser } = useAuth();

  const sideData = useSideData?.() || {};

  const {
    data,
    total,
    loading,
    isFetching,
    pagination,
    setPagination,
    filters,
    setFilters,
    sorting,
    setSorting
  } = useEntityTable(entityKey, fetchFn, {
    defaultPageSize: 20,
  });

  const goToEntity = (id) => {
    const paths = getPaths();
    navigateToEntity({
      navigate,
      location,
      ...paths,
      id,
    });
  };

  const handleToggle = (row) => (e) => {
    e.stopPropagation();
    onToggle?.(row, appUser);
  };

  const columns = useMemo(() =>
    getColumns({
      t,
      k,
      appUser,
      onClick: handleToggle,
    }),
    [t, k, appUser]
  );

  const actions = {
    left: {
      isActive: filters.isActive,
      onClick: () => setFilters((p) => ({ ...p, isActive: !p.isActive })),
    },
    right: {
      onClick: () => goToEntity(),
    }
  };

  return (
    <EntityPageLayout
      title={title}
      actions={actions}
      filters={filters}
      setFilters={setFilters}
      setPagination={setPagination}
      onFabClick={() => goToEntity()}
      table={
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-4'>
          <DataTable
            data={data}
            columns={columns}
            loading={loading}
            isFetching={isFetching}
            pagination={{ ...pagination, total }}
            setPagination={setPagination}
            sorting={sorting}
            setSorting={setSorting}
            onRowClick={(row) => goToEntity(row.id)}
          />

          {renderSidebar?.(sideData)}
        </div>
      }
    />
  );
}