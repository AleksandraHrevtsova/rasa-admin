import {
  getUserById,
  createUser,
  updateUser,
  activateUser,
  deactivateUser,
} from '@/domain/user/user.service';

import { fields } from '@/domain/user/user.fields';

import { useRoles } from '@/domain/role/hooks/useRoles';
import { useCounterparties } from '@/domain/counterparty/hooks/useCounterparties';

import { userMapper } from '@/domain/user/user.mapper';
import { normalizeUser } from '@/domain/user/user.compare';

import { useUserFormDerived } from '@/domain/user/hooks/useUserFormDerived';
import { formConfig } from '@/domain/user/user.form.config';

export const userForm = (ctx) => {
  return {
    key: ctx.pageTags.user,
    
    paths: {
      list: ctx.nav.users,
      create: ctx.nav.newUser,
      edit: ctx.nav.editUser,
    },
  
    api: {
      getById: getUserById,
      create: createUser,
      update: updateUser,
      activate: activateUser,
      deactivate: deactivateUser,
    },
    
    fieldNames: fields,
    
    hooks: {
      useData: () => {
        const { data: roles = [] } = useRoles();
        const { data: counterparties = [] } = useCounterparties();
        return { roles, counterparties };
      },
    },
  
    mapper: {
      fromApi: userMapper.fromApi,
      toApi: userMapper.toApi,
      normalize: normalizeUser,
    },

    useDerived: useUserFormDerived,
    config: formConfig,
  }
};