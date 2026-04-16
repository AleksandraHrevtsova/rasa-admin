import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { NAV } from '@/config/constants';
import { navigateToEntity } from '@/core/utils/navigation';

import { getUsers } from '@/domain/user/user.service';

import { EntityPageLayout } from '@/ui/components/EntityPageLayout';
import DataTable from '@/ui/components/DataTable';
import { RolesList } from '@/ui/components/Roles';

import { useI18n } from '@/ui/hooks/useI18n';
import { useEntityTable } from '@/ui/hooks/useEntityTable';

export default function Users() {
  const { t, k } = useI18n();

  const location = useLocation();
  const navigate = useNavigate();

  const {
    data,
    loading,
    isActive,
    setIsActive,
    pagination,
    setPagination,
    filters,
    setFilters,
  } = useEntityTable(getUsers);

  const goToUser = (id) => {
    navigateToEntity({
      navigate,
      location,
      listPath: NAV.users,
      createPath: NAV.newUser,
      editPath: NAV.editUser,
      id,
    });
  };
  
  const columns = [
    { key: 'name', label: t(k.common.name), sortable: true },
    { key: 'email', label: t(k.common.email) },
    { key: 'role', label: t(k.common.role), render: (row) => row.role?.name || '—' },
    { key: 'userHubs', label: t(k.common.hubs), render: (row) => row.hubs?.length || '-' }
  ];

  const actions = useMemo(() => {
    return {
      left: {
        isActive,
        onClick: () => setIsActive((p) => !p),
      },
      right: {
        onClick: () => goToUser(),
      }
    };
  }, [isActive]);

  return (
    <EntityPageLayout
      title={t(k.users.title)}
      actions={actions}
      loading={loading}
      table={
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-4'>
          <DataTable
            data={data}
            columns={columns}
            loading={loading}
            pagination={pagination}
            setPagination={setPagination}
            onRowClick={(row) => goToUser(row.id)}
          />
          {isActive && (
            <>
              <div className='hidden lg:block'>
                <RolesList />
              </div>
              <div className='mt-4 lg:hidden'>
                <RolesList />
              </div>
            </>
          )}
        </div>
      }
      fab={{ onClick: () => goToUser() }}
    />
  );
};
