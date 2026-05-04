import { NAV, pageTags } from '@/config/constants';
import { normalize } from '@/domain/entities.normalize';
import { mappers } from '@/domain/entities.mapper';
import { getEntityDerived } from '@/domain/entities.derive';

import { useRoles } from '@/domain/role/hooks/useRoles';
import { useProducts } from '@/domain/product/hooks/useProducts';
import { useCounterparties } from '@/domain/counterparty/hooks/useCounterparties';

import { useEntityFormConfig } from '@/ui/hooks/useEntityFormConfig';

import {
  getUserById,
  createUser,
  updateUser,
  activateUser,
  deactivateUser,
} from '@/domain/user/user.service';

import {
  getProductById,
  createProduct,
  updateProduct,
  activateProduct,
  deactivateProduct,
} from '@/domain/product/product.service';

import {
  getCounterpartyById,
  createCounterparty,
  updateCounterparty,
  activateCounterparty,
  deactivateCounterparty,
} from '@/domain/counterparty/counterparty.service';

export const forms = {
  user: {
    key: pageTags.user,

    paths: {
      list: NAV.users,
      create: NAV.newUser,
      edit: NAV.editUser,
    },

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
      ...mappers(pageTags.user),
      normalize: () => normalize(pageTags.user),
    },

    useDerived: (ctx) => getEntityDerived(pageTags.user, ctx),
    config: (ctx) => useEntityFormConfig(ctx).user,
  },

  product: {
    key: pageTags.product,

    paths: {
      list: NAV.products,
      create: NAV.newProduct,
      edit: NAV.editProduct,
    },

    api: {
      getById: getProductById,
      create: createProduct,
      update: updateProduct,
      activate: activateProduct,
      deactivate: deactivateProduct,
    },

    fieldNames: {
      name: 'name',
      namePublic: 'namePublic',
      sku: 'sku',
      netto: 'netto',
      brutto: 'brutto',
  
      unitsInOneBox: 'unitsInOneBox',
      unitsInOnePalletRegular: 'unitsInOnePalletRegular',
      unitsInOnePalletMin: 'unitsInOnePalletMin',
      
      boxesInOnePalletRegular: 'boxesInOnePalletRegular',
      boxesInOnePalletMin: 'boxesInOnePalletMin',
      
      unitsOverOnePallet: 'unitsOverOnePallet',
      boxesOverOnePallet: 'boxesOverOnePallet',
    },

    hooks: {
      useData: () => ({}),
    },

    mapper: {
      ...mappers(pageTags.product),
      normalize: () => normalize(pageTags.product),
    },

    useDerived: (ctx) => getEntityDerived(pageTags.product, ctx),
    config: (ctx) => useEntityFormConfig(ctx).product,
  },

  counterparty: {
    key: pageTags.counterparty,

    paths: {
      list: NAV.counterparties,
      create: NAV.newCounterparty,
      edit: NAV.editCounterparty,
    },

    api: {
      getById: getCounterpartyById,
      create: createCounterparty,
      update: updateCounterparty,
      activate: activateCounterparty,
      deactivate: deactivateCounterparty,
    },

    fieldNames: {
      name: 'name',
      namePublic: 'namePublic',
      employees: 'employees',
      hubs: 'hubs',
      products: 'products',
      organizations: 'organizations',
      paymentTypes: 'paymentTypes'
    },

    hooks: {
      useData: () => {
        const { data: products = [] } = useProducts();
  //       const { data: hubs = [] } = useHubs();
  //       const { data: employees = [] } = useEmployees();
  //       const { data: organizations = [] } = useOrganizations();
  //                     paymentTypes
        return { products, 
          // hubs, organizations, employees 
        };
      },
    },

    mapper: {
      ...mappers(pageTags.counterparty),
      normalize: () => normalize(pageTags.counterparty),
    },

    useDerived: (ctx) => getEntityDerived(pageTags.counterparty, ctx),
    config: (ctx) => useEntityFormConfig(ctx).counterparty,
  },
};