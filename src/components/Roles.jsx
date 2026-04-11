import { useEffect, useState } from 'react';
import { getRoles } from '../services/role.service';
import { useNotify } from '../hooks/useNotify';
import { useLocale } from '../contexts/LocaleContext';

export function RolesList() {
  const { t } = useLocale();
  const notify = useNotify();

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const r = await getRoles();
        setRoles(r.data.items);
      } catch (err) {
        notify.error(err.response?.data?.message || 'Error loading roles');
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="bg-white border rounded-xl p-3">
      <h2 className="text-sm font-semibold mb-2">
        {t['roles.title']}
      </h2>

      <div className="flex flex-col gap-2">
        {roles?.map((role) => (
          <div
            key={role.id}
            className="p-2 border rounded-lg text-sm"
          >
            <div className="font-medium text-blue-950">
              {role.name}
            </div>
            <div className="text-gray-500 text-xs">
              {role.description || '—'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}