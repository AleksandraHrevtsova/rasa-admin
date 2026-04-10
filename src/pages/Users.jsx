import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useLocale } from '../contexts/LocaleContext';
import { useUsersTable } from '../hooks/useUsersTable';

import { NAV } from "../constants/navigation";
import DataTable from "../components/DataTable";
import { Loading } from "../components/Loading";
import { Button } from "../components/Button";

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
  } = useUsersTable();

  const navigateToUserPage = (userId) => {
    const id = typeof userId === 'string' ? userId : '';
    let path = userId ? NAV.users + '/' + id : NAV.newUser;
    navigate(path, { state: { from: location.pathname } });
  };

  function formatLabel(key) {
    return t[`users.${key}`] || key;
  };
  
  const columns = [
    {
      key: 'name',
      label: formatLabel('name'),
      sortable: true,
    },
    {
      key: 'email',
      label: formatLabel('email'),
    },
    {
      key: 'role',
      label: formatLabel('role'),
      render: (row) => row.role?.name || '—',
    },
    {
      key: 'userHubs',
      label: formatLabel('userHubs'),
      render: (row) => row.hubs?.length || '-',
    }
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary text-blue-950 mr-6">{t["users.title"]}</h1>
          <Button
            label={isActive ? t['table.showInactive'] : t['table.showActive']}
            handleClick={() => setIsActive((p) => !p)} 
            action='show' 
          />
        </div>
        <Button
          label={t['users.create']} 
          handleClick={() => navigateToUserPage()} 
          action='create' 
        />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <DataTable
          data={data}
          columns={columns}
          loading={loading}
          pagination={pagination}
          setPagination={setPagination}
          onRowClick={(row) => navigateToUserPage(row.id)}
        />
      )}
    </div>
  );
}