import { getUsers } from './user.service';
import { getUserColumns } from './users.table';
import { toggleUserActive } from './user.mutations';

import { useRoles } from '@/domain/role/hooks/useRoles';
import { RolesList } from '@/ui/components/Roles';

export const usersEntity = (ctx) => {

  return {
    key: ctx.pageTags.users,
    title: ctx.k.users.title,
  
    fetchFn: getUsers,
    columns: getUserColumns,
  
    paths: {
      list: ctx.nav.users,
      create: ctx.nav.newUser,
      edit: ctx.nav.editUser,
    },
  
    useSideData: () => ({
      roles: useRoles().data || [],
    }),
  
    renderSidebar: ({ roles }) =>
      roles?.length ? <RolesList roles={roles} /> : null,
  
    toggle: {
      mutationFn: toggleUserActive,
      errorMessage: ctx.k.common.toggleActiveError,
    },
  }
};