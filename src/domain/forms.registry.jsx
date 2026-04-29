import { pageTags } from '@/config/constants';
import {
  getUserById,
  createUser,
  updateUser,
  activateUser,
  deactivateUser,
} from '@/domain/user/user.service';
import { useRoles } from '@/domain/role/hooks/useRoles';
import { useCounterparties } from '@/domain/counterparty/hooks/useCounterparties';
import { mapFromApi, mapToApi } from '@/domain/user/user.mapper';
import { normalizeUser } from '@/domain/user/user.compare';
import { useEntityFormConfig } from '@/ui/hooks/useEntityFormConfig';
import { useUserFormDerived } from '@/domain/user/hooks/useUserFormDerived';

export const forms = {
  user: {
    key: pageTags.user,

    api: {
      getById: getUserById,
      create: createUser,
      update: updateUser,
      activate: activateUser,
      deactivate: deactivateUser,
    },

    fieldNames: {
      name: 'name',
      email: 'email',
      phone: 'phone',
      role: 'roleId',
      counterparty: 'counterpartyId',
      hubs: 'hubIds',
      password: 'password',
    },

    hooks: {
      useData: () => {
        const { data: roles = [] } = useRoles();
        const { data: counterparties = [] } = useCounterparties();
        return { roles, counterparties };
      },
    },

    mapper: {
      fromApi: mapFromApi,
      toApi: mapToApi,
      normalize: normalizeUser,
    },

    useDerived: useUserFormDerived,
    config: (ctx) => useEntityFormConfig(ctx).user,
  },

  // product: {
  //   key: pageTags.product,

  //   api: {
  //     getById: getProductById,
  //     create: createProduct,
  //     update: updateProduct,
  //   },

  //   hooks: {
  //     useData: () => ({}), // 🔥 НИЧЕГО НЕ НУЖНО
  //   },

  //   mapper: {
  //     fromApi: mapProductFromApi,
  //     toApi: mapProductToApi,
  //     normalize: normalizeProduct,
  //   },

  //   config: (ctx) => useEntityFormConfig(ctx).product,
  // },

  // counterparty: {
  //   key: pageTags.counterparty,

  //   api: {
  //     getById: getCounterpartyById,
  //     create: createCounterparty,
  //     update: updateCounterparty,
  //   },

  //   hooks: {
  //     useData: () => {
  //       const { data: products = [] } = useProducts();
  //       const { data: hubs = [] } = useHubs();
  //       const { data: organizations = [] } = useOrganizations();
  //       const { data: users = [] } = useUsers();

  //       return { products, hubs, organizations, users };
  //     },
  //   },

  //   mapper: {
  //     fromApi: mapCounterpartyFromApi,
  //     toApi: mapCounterpartyToApi,
  //     normalize: normalizeCounterparty,
  //   },

  //   config: (ctx) => useEntityFormConfig(ctx).counterparty,
  // },
};