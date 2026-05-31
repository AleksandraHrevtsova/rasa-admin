import {
  getCounterpartyById,
  createCounterparty,
  updateCounterparty,
  activateCounterparty,
  deactivateCounterparty,
} from '@/domain/counterparty/counterparty.service';

import { fields } from '@/domain/counterparty/counterparty.fields';

import { useProducts } from '@/domain/product/hooks/useProducts';
import { usePaymentTypes } from '@/domain/payment-type/hooks/usePaymentTypes';
import { useOrganizations } from '@/domain/organization/hooks/useOrganizations';

import { counterpartyMapper } from '@/domain/counterparty/counterparty.mapper';
import { normalizeCounterparty } from '@/domain/counterparty/counterparty.compare';

import { useCounterpartyFormDerived } from '@/domain/counterparty/hooks/useCounterpartyFormDerived';
import { formConfig } from '@/domain/counterparty/counterparty.form.config';

export const counterpartyForm = (ctx) => {
  return {
    key: ctx.pageTags.counterparty,

    paths: {
      list: ctx.nav.counterparties,
      create: ctx.nav.newCounterparty,
      edit: ctx.nav.editCounterparty,
    },

    api: {
      getById: getCounterpartyById,
      create: createCounterparty,
      update: updateCounterparty,
      activate: activateCounterparty,
      deactivate: deactivateCounterparty,
    },

    fieldNames: fields,

    hooks: {
      useData: () => {
        const { data: products = [] } = useProducts();
        const { data: paymentTypes = [] } = usePaymentTypes();
        const { data: organizations = [] } = useOrganizations();

        return { 
          products,
          paymentTypes,
          organizations,
        };
      },
    },

    mapper: {
      fromApi: counterpartyMapper.fromApi,
      toApi: counterpartyMapper.toApi,
      normalize: normalizeCounterparty,
    },

    useDerived: useCounterpartyFormDerived,
    config: formConfig,
  };
};