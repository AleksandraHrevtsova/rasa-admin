import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ShieldCheck, ShieldClose } from 'lucide-react';

import { NAV, pageTags } from '@/config/constants';

import { useAuth } from '@/contexts/AuthContext';

import { navigateToEntity } from '@/core/utils/navigation';

import { getUsers } from '@/domain/user/user.service';
import { useRoles } from '@/domain/role/hooks/useRoles';

import { EntityPageLayout } from '@/ui/components/EntityPageLayout';
import DataTable from '@/ui/components/DataTable';
import { RolesList } from '@/ui/components/Roles';

import { useI18n } from '@/ui/hooks/useI18n';
import { useNotify } from '@/ui/hooks/useNotify';
import { useEntityTable } from '@/ui/hooks/useEntityTable';
import { useToggleUserActive } from '@/ui/hooks/useToggleUserActive';

export default function Users() {
  const { t, k } = useI18n();
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const { appUser } = useAuth();
  const notify = useNotify();
  
  const { data: roles = [] } = useRoles();
  
  const entityKey = pageTags.users;
  const toggleActiveMutation = useToggleUserActive(entityKey);

  const {
    data,
    total,
    loading,
    isFetching,
    refetch,
    pagination,
    setPagination,
    filters,
    setFilters,
    sorting,
    setSorting
  } = useEntityTable(entityKey, getUsers, {
    defaultPageSize: 20,
  });

  const isActive = filters.isActive;

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

  const handleToggle = (row) => (e) => {
    e.stopPropagation();
    const isCurrentUser = row.id === appUser.id;
    if (isCurrentUser) return;
    toggleActiveMutation.mutate({ id: row.id, isActive: row.isActive });
  };
  
  const columns = [
    { key: 'role', label: t(k.common.role), render: (row) => row.role?.name || '—', width: '25%', },
    { key: 'name', label: t(k.common.name), sortable: true, width: '25%', },
    { key: 'counterparty', label: t(k.common.counterparty), render: (row) => row.counterparty?.name || '—', width: '25%', },
    { key: 'userHubs', label: t(k.common.hubs), render: (row) => row.userHubs?.length || '-', width: '25%', },
    { key: 'actions', label: t(k.common.actions), render: (row) => {
      const isCurrentUser = row.id === appUser.id;
      if (isCurrentUser) return '-';
      return (        
        <button
          onClick={handleToggle(row)}
          className='text-xs px-2 py-1 rounded border hover:bg-gray-100'
        >{row.isActive ? <ShieldClose size={20} /> : <ShieldCheck size={20} /> }</button>)
    } }
  ];

  const actions = useMemo(() => {
    return {
      left: {
        isActive,
        onClick: () => setFilters((p) => ({ ...p, isActive: !p.isActive })),
      },
      right: {
        onClick: () => goToUser(),
      }
    };
  }, [isActive, navigate, location]);

  return (
    <EntityPageLayout
      title={t(k.users.title)}
      actions={actions}
      filters={filters} 
      setFilters={setFilters} 
      setPagination={setPagination}
      onFabClick={() => goToUser()}
      table={
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-4'>
          <DataTable
            data={data}
            columns={columns}
            loading={loading}
            isFetching={isFetching}
            pagination={{ ...pagination, total }}
            setPagination={setPagination}
            pageSizeOptions={[5, 10, 20, 50]}
            sorting={sorting}
            setSorting={setSorting}
            onRowClick={(row) => goToUser(row.id)}
          />
          <RolesList roles={roles} />
        </div>
      }
    />
  );
};
