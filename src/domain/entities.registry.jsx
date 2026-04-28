import { NAV, pageTags } from '@/config/constants';
import { i18nStore } from '@/core/i18n/store';

import { getUsers } from '@/domain/user/user.service';
import { getProducts} from '@/domain/product/product.service';
import { getCounterparties } from '@/domain/counterparty/counterparty.service';

import { getUserColumns } from '@/domain/user/users.table';
import { getProductColumns } from '@/domain/product/products.table';
import { getCounterpartyColumns } from '@/domain/counterparty/counterparties.table';

import { useToggleUserActive } from '@/ui/hooks/useToggleUserActive';
import { useToggleProductActive } from '@/ui/hooks/useToggleProductActive';
import { useToggleCounterpartyActive } from '@/ui/hooks/useToggleCounterpartyActive';

import { useRoles } from '@/domain/role/hooks/useRoles';
import { RolesList } from '@/ui/components/Roles';

const { k } = i18nStore;

export const entities = {
  users: {
    key: pageTags.users,
    title: k.users.title,
    fetchFn: getUsers,
    columns: getUserColumns,
    paths: {
      list: NAV.users,
      create: NAV.newUser,
      edit: NAV.editUser,
    },
    useSideData: () => ({ roles: useRoles().data} || []),
    renderSidebar: ({ roles }) => roles?.length ? <RolesList roles={roles} /> : null,
    toggleHook: useToggleUserActive,
  },
  products: {
    key: pageTags.products,
    title: k.products.title,
    fetchFn: getProducts,
    columns: getProductColumns,
    paths: {
      list: NAV.products,
      create: NAV.newProduct,
      edit: NAV.editProduct,
    },
    toggleHook: useToggleProductActive,
  },
  counterparties: {
    key: pageTags.counterparties,
    title: k.counterparties.title,
    fetchFn: getCounterparties,
    columns: getCounterpartyColumns,
    paths: {
      list: NAV.conterparties,
      create: NAV.newCounterparty,
      edit: NAV.editCounterparty,
    },
    toggleHook: useToggleCounterpartyActive,
  },
};