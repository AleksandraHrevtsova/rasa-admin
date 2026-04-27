import { NAV, pageTags } from '@/config/constants';
import { getUserColumns } from '@/domain/user/users.table';
import { getUsers } from '@/domain/user/user.service';
import { useRoles } from '@/domain/role/hooks/useRoles';
import { RolesList } from '@/ui/components/Roles';
import { useI18n } from '@/ui/hooks/useI18n';
import { useToggleUserActive } from '@/ui/hooks/useToggleUserActive';
import { EntityPage } from '@/ui/pages/EntityPage';

export default function Users() {
  const { t, k } = useI18n();
  const { data: roles = [] } = useRoles();
  const toggleActive = useToggleUserActive(pageTags.users);

  return (
    <EntityPage
      entityKey={pageTags.users}
      title={t(k.users.title)}
      fetchFn={getUsers}
      getColumns={getUserColumns}
      useSideData={() => ({ roles })}
      renderSidebar={({ roles }) =>
        roles?.length > 0 ? <RolesList roles={roles} /> : null
      }
      onToggle={(row, appUser) => {
        if (row.id === appUser.id) return;
        toggleActive.mutate({ id: row.id, isActive: row.isActive });
      }}
      getPaths={() => ({
        listPath: NAV.users,
        createPath: NAV.newUser,
        editPath: NAV.editUser,
      })}
    />
  );
};
