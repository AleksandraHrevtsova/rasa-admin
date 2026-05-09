import { 
  getOrganizationById, 
  createOrganization,
  updateOrganization,
  activateOrganization,
  deactivateOrganization,
} from '@/domain/organization/organization.service';

import { fields } from '@/domain/organization/organization.fields';

import { useCounterparties } from '@/domain/counterparty/hooks/useCounterparties';

import { organizationMapper } from '@/domain/organization/organization.mapper';
import { normalizeOrganization } from '@/domain/organization/organization.compare';

import { useOrganizationFormDerived } from '@/domain/organization/hooks/useOrganizationFormDerived';
import { formConfig } from '@/domain/organization/organization.form.config';

export const organizationForm = (ctx) => {
  return {
    key: ctx.pageTags.organization,

    paths: {
      list: ctx.nav.organizations,
      create: ctx.nav.newOrganization,
      edit: ctx.nav.editOrganization,
    },

    api: {
      getById: getOrganizationById,
      create: createOrganization,
      update: updateOrganization,
      activate: activateOrganization,
      deactivate: deactivateOrganization,
    },

    fieldNames: fields,

    hooks: {
      useData: () => {
        const { data: counterparties = [] } = useCounterparties();
        return { counterparties };
      },
    },

    mapper: {
      fromApi: organizationMapper.fromApi,
      toApi: organizationMapper.toApi,
      normalize: normalizeOrganization,
    },

    useDerived: useOrganizationFormDerived,
    config: formConfig,
  };
};