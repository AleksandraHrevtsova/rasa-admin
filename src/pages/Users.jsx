import { useLocation, useNavigate } from 'react-router';
import { Plus, ShieldCheck, ShieldClose } from 'lucide-react';

import { useLocale } from '../contexts/LocaleContext';

import { useEntityTable } from '../hooks/useEntityTable';

import { getUsers } from '../services/user.service';

import { EntityPageLayout } from '../components/EntityPageLayout';
import { Button } from '../components/Button';
import DataTable from '../components/DataTable';
import { RolesList } from '../components/Roles';

import { NAV } from '../constants/navigation';
import { navigateToEntity } from '../utils/navigation';

export default function Users() {
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

  function formatLabel(key) {
    return t[`users.${key}`] || key;
  };
  
  const columns = [
    { key: 'name', label: formatLabel('name'), sortable: true },
    { key: 'email', label: formatLabel('email') },
    { key: 'role', label: formatLabel('role'), render: (row) => row.role?.name || '—' },
    { key: 'userHubs', label: t['hubs'], render: (row) => row.hubs?.length || '-' }
  ];

  return (
    <EntityPageLayout
      title={t['users.title']}
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
            onClick={() => goToUser()} 
            action='create' 
            icon={Plus}
          />
        )
      }}
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
      fab={{
        label: t['create'],
        onClick: () => goToUser()
      }}
    />

  );
}