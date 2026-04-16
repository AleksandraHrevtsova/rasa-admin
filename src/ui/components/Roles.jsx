import { useEffect, useState } from 'react';
import { getRolesCached } from '@/core/cache/dictionaries.cache';
import { useNotify } from '@/ui/hooks/useNotify';
import { useI18n } from '@/ui/hooks/useI18n';

export function RolesList() {
  const { t, k } = useI18n();
  const notify = useNotify();

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await getRolesCached();
        setRoles(roles);
      } catch (err) {
        notify.error(err.response?.data?.message || 'Error loading roles');
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className='bg-white border rounded-xl p-3'>
      <h2 className='text-sm font-semibold mb-2'>
        {t(k.users.roles)}
      </h2>

      <div className='flex flex-col gap-2'>
        {roles?.map((role) => (
          <div
            key={role.id}
            className='p-2 border rounded-lg text-sm'
          >
            <div className='font-medium text-blue-950'>
              {role.name}
            </div>
            <div className='text-gray-500 text-xs'>
              {role.description || '—'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}