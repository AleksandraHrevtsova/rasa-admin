import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { navigateToEntity } from '@/core/utils/navigation';
import { useAuth } from '@/core/auth/hooks/useAuth';

import { EntityPageLayout } from '@/ui/components/EntityPageLayout';
import DataTable from '@/ui/components/table/DataTable';
import { useEntityTable } from '@/ui/hooks/useEntityTable';

export function BaseEntityPage({
  title,
  fetchFn,
  columns,
  onToggle,
  paths,
  renderSidebar,
  entityKey,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { appUser } = useAuth();

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
    setSorting,
  } = useEntityTable(entityKey, fetchFn, {
    defaultPageSize: 20,
  });

  const goToEntity = (id) => {
    navigateToEntity({
      navigate,
      location,
      listPath: paths.list,
      createPath: paths.create,
      editPath: paths.edit,
      id,
    });
  };

  const enhancedColumns = useMemo(() => {
    return columns.map((col) => {
      if (col.key !== 'actions') return col;

      return {
        ...col,
        render: (row) => col.render(row, { onToggle, appUser }),
      };
    });
  }, [columns, onToggle, appUser]);

  const actions = useMemo(() => ({
    left: {
      isActive: filters.isActive,
      onClick: () => setFilters((p) => ({ ...p, isActive: !p.isActive })),
    },
    right: {
      onClick: () => goToEntity(),
    },
  }), [filters.isActive]);

  return (
    <EntityPageLayout
      title={title}
      actions={actions}
      filters={filters}
      setFilters={setFilters}
      setPagination={setPagination}
      onFabClick={() => goToEntity()}
      table={
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-4">
          <DataTable
            data={data}
            columns={enhancedColumns}
            loading={loading}
            isFetching={isFetching}
            pagination={{ ...pagination, total }}
            setPagination={setPagination}
            sorting={sorting}
            setSorting={setSorting}
            onRowClick={(row) => goToEntity(row.id)}
          />

          {renderSidebar && renderSidebar()}
        </div>
      }
    />
  );
}